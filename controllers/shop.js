import mongoose from "mongoose";
import Shop from "../models/shop.js";

class ShopController {
  getShopByUsername(req, res) {
    const { username } = req.params;

    Shop.findOne({ username: username })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  }

  updateShop(req, res) {
    const { shopId } = req.params;
  }
}

export default ShopController;
