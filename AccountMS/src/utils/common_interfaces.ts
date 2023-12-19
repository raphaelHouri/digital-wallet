import { Document, Types } from "mongoose";
import { MongoDbConfig } from "../config/db";


export interface AppConfig {
  mongo: MongoDbConfig;
  app: { port: number | string };
}

// DATABASE SCHEMA INTERFACES
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
  status: TransactionStatus;
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

export type TransactionStatus = "pending" | "pending-approval" | "success" | "rejected";;


// REQUEST INTERFACES

export interface TransactionQuery {
  transactionType: TransactionType;
  userId: string;
  startDate: string;
  endDate: string;
  page: string;
  limit: string;
}

export interface TransactionBody {
  userId: string;
  amount: number;
  currency: string;
  status: string;
  fromWalletId: string;
  toWalletId: string;
}

export type TransactionType = "sent" | "received" | "all";