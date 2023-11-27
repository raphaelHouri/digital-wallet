import { Router } from "express";
import { TransactionsController } from "../controllers/transaction.controller";

const router = Router();
router.post("/transactions/", TransactionsController.getTransactions);
router.post("/transactions/execute", TransactionsController.executeTransaction);

export default router;
