import { Router } from "express";
import { AccountController } from "../controllers/account.controller";

const router = Router();

router.get("/user/:userId", AccountController.getUsersData);
router.get("/wallet/:walletId", AccountController.getWalletData);

export default router;
