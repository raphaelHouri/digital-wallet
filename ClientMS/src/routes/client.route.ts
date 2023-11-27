// client.route.ts

import { Router } from "express";
import { ClientController } from "../controllers/client.controller";

const router = Router();

// Define client routes
router.get("/user/:userId", ClientController.getUserById);
router.get("/wallet/deposit/:walletId", ClientController.getWalletDeposit);
router.post("/transactions", ClientController.getTransactions);
router.post("/transactions/execute", ClientController.sendTransaction);

export default router;
