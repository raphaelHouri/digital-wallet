import { Schema, Types, model } from 'mongoose';
import { ITransaction } from '../utils/common_interfaces';

const transactionsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, default: new Types.ObjectId },
  amount: { type: Number, required: true },
  currency: { type: String, enum: ['ils', 'usd', 'euro'], default:"ils" }, 
  transactionId: { type: Schema.Types.ObjectId, default: new Types.ObjectId, required: true },
  status: { type: String, enum: ['pending', 'success', 'rejected'], required: true },
  dateCreated: { type: Date, default: Date.now },
  lastUpdateDate: { type: Date, default: Date.now  },
  fromWalletId: { type: Schema.Types.ObjectId, default: new Types.ObjectId, required: true },
  toWalletId: { type: Schema.Types.ObjectId, default: new Types.ObjectId, required: true },
});

export const TransactionsModel = model<ITransaction>('Transaction', transactionsSchema);
