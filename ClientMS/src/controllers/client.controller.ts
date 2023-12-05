// client.controller.ts

import { Request, Response } from "express";
import { AxiosError } from "axios";
import { appConfig } from "../app";
import { fetcher } from "../utils/request_utils";

export class ClientController {
  public static async getUserById(req: Request, res: Response): Promise<void> {
    const url = `${appConfig.msUrls.accountMS}api/v1/users/${req.params.userId}`;
    await fetcher(res, url, "GET");
  }

  public static async getWalletDeposit(
    req: Request,
    res: Response
  ): Promise<void> {
    const url = `${appConfig.msUrls.accountMS}api/v1/wallets/${req.params.walletId}`;
    await fetcher(res, url, "GET");
  }

  public static async getTransactions(
    req: Request,
    res: Response
  ): Promise<void> {
    const url = `${appConfig.msUrls.transactionMS}api/v1/transactions`;
    await fetcher(res, url, "POST", req.body);
  }

  public static async sendTransaction(
    req: Request,
    res: Response
  ): Promise<void> {
    const url = `${appConfig.msUrls.transactionMS}api/v1/transactions/execute`;
    await fetcher(res, url, "POST", req.body);
  }

}
