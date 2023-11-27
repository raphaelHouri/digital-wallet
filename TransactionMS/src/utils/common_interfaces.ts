import { Document, Types } from "mongoose";

export interface IUser extends Document {
  userID: string;
  mail: string;
  name: string;
  ID: string;
  joinedAt: Date;
  phoneNumber?: string;
  singleWalletId?: string;
  groupedWalletIds?: string[];
}

export interface ITransaction extends Document {
  userId: string;
  amount: number;
  transactionId: string;
  status: "pending" | "success" | "rejected";
  dateCreated: Date;
  lastUpdateDate?: Date;
  fromWalletId: string;
  toWalletId: string;
}

export interface IWallet extends Document {
  walletID: string;
  userId?: string;
  isGroupedWallet: boolean;
  groupedUserIds?: string[];
  groupAdmin?: string;
  lastUpdate: Date;
  lastTransactionId?: string | null;
  balance: {
    ils: number;
    usd: number;
    euro: number;
  };
}

export interface INotification extends Document {
  fromWalletId: string;
  toWalletId: string;
  text: string;
  userId: string;
  createdAt: Date;
}

// request interfaces

export interface TransactionQuery {
  transactionType: "sent" | "received" | "all";
  walletID: string;
  startDate: string;
  endDate: string;
  page: string;
  limit: string;
}

export type Currency = "ils" | "usd" | "euro";
export type NotificationStatus = "success" | "rejected" | "error";


export interface TransactionBody {
  userId: string; 
  amount: number;
  currency: Currency;
  status: string;
  fromWalletId: string; 
  toWalletId: string; 
}
