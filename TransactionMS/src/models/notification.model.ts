import { Schema, model } from "mongoose";
import { INotification } from "../utils/common_interfaces";

const notificationSchema = new Schema({
  fromWalletId: { type: String, required: true },
  currency: { type: String, required: true },
  amount: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },  status: { type: String, required: true },
  message: { type: String },
});

export const NotificationModel = model<INotification>(
  "Notification",
  notificationSchema
);
