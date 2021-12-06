import express from "express";
import {
  login,
  register,
  checkEmailExist,
  checkShopExist,
} from "../controllers/user.js";

const router = express.Router();

router.post("/email", checkEmailExist);
router.post("/shopname", checkShopExist);
router.post("/login", login);
router.post("/register", register);

export default router;
