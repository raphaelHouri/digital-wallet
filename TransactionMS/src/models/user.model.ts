import { Schema, model, Types } from "mongoose";
import { IUser } from "../utils/common_interfaces";

const userSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, default: new Types.ObjectId, unique: true, required: true },
  mail: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  ID: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now },
  phoneNumber: { type: String },
  singleWalletID: { type: Schema.Types.ObjectId, default: new Types.ObjectId, unique: true, required: true },
  groupedWalletIDs: [{ type: Schema.Types.ObjectId, default: new Types.ObjectId, unique: true}],
});

export const UserModel = model<IUser>("User", userSchema);
