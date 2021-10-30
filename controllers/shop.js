import mongoose from "mongoose";
import Shop from "../models/shop.js";
import Item from "../models/item.js";
import Product from "../models/product.js";
import Transaction from "../models/transaction.js";

export const updateShopComponent = async (req, res) => {
  const { _id } = req.params;
  const { type, data } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.json({ error: "Shop Id doesn't exist" });

    let currentShop = await Shop.findById(_id);
    if (!shop) return res.json({ error: "Shop doesn't exist" });

    switch (type) {
      case "ITEM":
        const newItem = await Item.create({ ...data });
        if (data.type === "EQUIPMENT") {
          currentShop.equipments.push(newItem._id);
        } else {
          currentShop.supplies.push(newItem._id);
        }
        break;
      case "PRODUCT":
        const newProduct = await Product.create({ ...data });
        currentShop.products.push(newProduct._id);
        break;
      case "TRANSACTION":
        const newTransaction = await Transaction.create({ ...data });
        // TODO Calculate transaction money
        currentShop.products.push(newTransaction._id);
        break;
      default:
        currentShop = { ...currentShop, ...data };
        break;
    }

    const updatedShop = await currentShop.save();
    res.json(updatedShop);
  } catch (error) {
    console.log(error);
    res.json({ error: "Something went wrong." });
  }
};
