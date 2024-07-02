import express from "express";
import { authMiddleware } from "../middleware.js";
import {
  userAccountBalance,
  userTransferAmount,
} from "../controllers/account.controller.js";

const router = express.Router();

router
  .post("/transfer", authMiddleware, userTransferAmount)
  .get("/balance", authMiddleware, userAccountBalance);

export { router };
