import express from "express";
import {
  userSignin,
  userSignup,
  userUpdateInfo,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware.js";

const router = express.Router();

router
  .post("/signup", userSignup)
  .post("/signin", userSignin)
  .put("/", authMiddleware, userUpdateInfo);

export { router };
