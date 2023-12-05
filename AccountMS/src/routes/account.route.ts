import { Router } from "express";
import { AccountController } from "../controllers/account.controller";

const router = Router();

router.get("/users/:userId", AccountController.getUsersData);
router.get("/wallets/:walletId", AccountController.getWalletData);

export default router;
