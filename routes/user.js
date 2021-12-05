import express from "express";
import { login, register, checkEmailExist } from "../controllers/user.js";

const router = express.Router();

router.post("/email", checkEmailExist);
router.post("/login", login);
router.post("/register", register);

export default router;
