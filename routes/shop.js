import express from "express";

import { updateShopComponent } from "../controllers/shop.js";

const router = express.Router();

router.patch("/:_id", updateShopComponent);

export default router;
