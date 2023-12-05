import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { getErrorMessage, reportError } from "../utils/error_utils";
import { WalletsModel } from "../models/wallet.model";

export class AccountController {
  public static async getUsersData(req: Request, res: Response): Promise<void> {
    // Retrieve user data based on userId
    try {
      const userId = req.params.userId;
      const user = await UserModel.findOne({ userID: userId });

      if (user) {
        const userObj = user.toObject()
        res.json({ data: userObj, status: 200 });
      } else {
        res.json({ message: "User not found", status: 404 });
      }
    } catch (error) {
      reportError({ message: getErrorMessage(error) });
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public static async getWalletData(
    req: Request,
    res: Response
  ): Promise<void> {
    // Retrieve wallet data based on walletId
    const walletId = req.params.walletId;

    try {
      const wallet = await WalletsModel.findOne({ walletID: walletId });
      if (wallet) {
        const walletObj = wallet.toObject()
        res.json({ data: walletObj, status: 200 });
      } else {
        res.json({ status: 404, message: "wallet not found" });
      }
    } catch (error) {
      reportError({ message: getErrorMessage(error) });
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
