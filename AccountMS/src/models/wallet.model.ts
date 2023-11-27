import { Schema, model, Types } from "mongoose";
import { IWallet } from "../utils/common_interfaces";

const walletsSchema = new Schema({
  walletID: {
    type: Schema.Types.ObjectId,
    default: new Types.ObjectId(),
    unique: true,
    required: true,
  },
  userID: { type: Schema.Types.ObjectId },
  isGroupedWallet: { type: Boolean, required: true },
  groupedUserIds: [{ type: Schema.Types.ObjectId }],
  groupAdmin: { type: Schema.Types.ObjectId },
  lastUpdate: { type: Date, default: Date.now },
  lastTransactionId: { type: Schema.Types.ObjectId },
  balance: {
    ils: { type: Number, required: true },
    usd: { type: Number, required: true },
    euro: { type: Number, required: true },
  },
});

export const WalletsModel = model<IWallet>("Wallet", walletsSchema);
