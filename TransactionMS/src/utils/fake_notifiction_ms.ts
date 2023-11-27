import { NotificationStatus, TransactionBody } from "./common_interfaces";
import logger from "./logger";

export function sendNotification(
  transactionDetails: TransactionBody,
  status: NotificationStatus,
  message: string
) {
  logger.info(JSON.stringify({ Details: transactionDetails, status: status, message:message }));
}
