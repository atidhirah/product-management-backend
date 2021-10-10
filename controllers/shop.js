import mongoose from "mongoose";
import Shop from "../models/shop.js";

class ShopController {
  getAllShop(req, res) {
    Shop.find({})
      .sort({ shopName: 1 })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  }
}

export default ShopController;
