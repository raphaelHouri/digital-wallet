import { Request, Response } from "express";
import {
  Currency,
  NotificationStatus,
  TransactionBody,
  TransactionQuery,
} from "../utils/common_interfaces";
import { TransactionsModel } from "../models/transaction.model";
import { getErrorMessage, reportError } from "../utils/error_utils";
import { WalletsModel } from "../models/wallet.model";
import { sendNotification } from "../utils/fake_notifiction_ms";
import { NotificationModel } from "../models/notification.model";
import logger from "../utils/logger";

export class TransactionsController {
  public static async getTransactions(
    req: Request,
    res: Response
  ): Promise<void> {
    // Retrieve transactions based on filters such as transaction type, date range, page, limit and user ID
    try {
      const {
        transactionType,
        walletID,
        startDate,
        endDate,
        page,
        limit,
      }: TransactionQuery = req.body;

      const filter: { [key: string]: any } = {};
      const options: { [key: string]: any } = {};

      if (transactionType === "sent") {
        filter.fromWalletId = walletID;
      } else if (transactionType === "received") {
        filter.toWalletId = walletID;
      } else {
        filter.$or = [{ fromWalletId: walletID }, { toWalletId: walletID }];
      }

      if (startDate && endDate) {
        const sDate = Date.parse(startDate);
        const eDate = Date.parse(endDate);
        filter.dateCreated = { $gte: sDate, $lte: eDate };
      }

      options.skip = parseInt(limit) * (parseInt(page) - 1);
      options.limit = parseInt(limit);

      // Query and paginate results
      const transactions = await TransactionsModel.find(
        filter,
        null,
        options
      ).sort({ date: -1 });
      if (transactions.length) {
        res.json({ data: transactions, status: 200 });
      } else {
        res.json({ message: "No results found", status: 404 });
      }
    } catch (error) {
      // Handle errors
      reportError({ message: getErrorMessage(error) });
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public static async getWalletById(walletId: string) {
    const wallet = await WalletsModel.findOne({ walletID: walletId });
    if (wallet) {
      return wallet!.toObject();
    } else {
      throw "Failed to find the wallet of the user. No transaction has been executed.";
    }
  }

  public static async createTransaction(
    res: Response,
    transactionDetails: TransactionBody,
    amount: number,
    walletId: string
  ) {
    const newTransaction = await TransactionsModel.create(transactionDetails);
    const currency = transactionDetails.currency;
    let status: NotificationStatus = "success"
    let notificationMessage = ""
    const operations = [
      {
        updateOne: {
          filter: { walletID: walletId },
          update: {
            $inc: { [`balance.${currency}`]: amount * -1 },
            $set: {
              lastUpdate: Date.now(),
              lastTransactionId: newTransaction.transactionId,
            },
          },
        },
      },
      {
        updateOne: {
          filter: { walletID: transactionDetails.toWalletId },
          update: {
            $inc: { [`balance.${currency}`]: amount },
            $set: { lastUpdate: Date.now() },
          },
        },
      },
    ];

    const result = await WalletsModel.bulkWrite(operations);
    if (result.ok) {
      await TransactionsModel.updateOne(
        { transactionId: newTransaction.transactionId },
        { status: "success" }
      );
      status = "success"
      notificationMessage = "Transaction Successful: The transaction has been completed successfully."
      sendNotification(transactionDetails, status, notificationMessage);
      NotificationModel.create({ ...transactionDetails, status: status, message: notificationMessage })
      res.json({ data: notificationMessage, status: 200 });
    } else {
      await TransactionsModel.updateOne(
        { transactionId: newTransaction.transactionId },
        { status: "rejected" }
      );
      status = "rejected"
      notificationMessage = "Transaction Failed: Internal Server Error No Transaction As been Execute."
      sendNotification(transactionDetails, status, notificationMessage);
      NotificationModel.create({ ...transactionDetails, status: status, message: notificationMessage })
      res.status(500).json({ message: notificationMessage, status: 500 });
    }
  }


  public static async executeTransaction(    
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      let status: NotificationStatus = "success"
      let notificationMessage = ""
      const transactionDetails = req.body
      const fromWallet = await TransactionsController.getWalletById(
        transactionDetails.fromWalletId
      );
      const currency: Currency = transactionDetails.currency;
      // validate the transaction
      if (fromWallet.balance[currency] < transactionDetails.amount) {
        status = "rejected"
        notificationMessage = "Transaction Failed: Insufficient Balance in Your Account. Please ensure that your account has enough funds to complete the transaction."
        sendNotification(transactionDetails, status, notificationMessage);
        NotificationModel.create({ ...transactionDetails, status: status, message: notificationMessage })
        res.json({ message: notificationMessage, status: 400 });
        return;
      }
      if (transactionDetails.amount < 0) {
        status = "rejected"
        notificationMessage = "Transaction Failed: The transaction amount must e positive number"
        sendNotification(transactionDetails, status, notificationMessage);
        NotificationModel.create({ ...transactionDetails, status: status, message: notificationMessage })
        res.json({ message: notificationMessage, status: 400 });
        return;
      }
      TransactionsController.createTransaction(
        res,
        transactionDetails,
        transactionDetails.amount,
        fromWallet.walletID.toString()
      );
    } catch (error) {

      logger.error({
        message: "Internal Server Error No Transaction As been Execute",
      });
    }
  }
}
