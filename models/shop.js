import mongoose from "mongoose";
import { ItemSchema } from "./item";
import { ProductSchema } from "./product";
import { TransactionSchema } from "./transaction";

const stringOption = {
  type: String,
  trim: true,
  minLength: 8,
  maxLength: 32,
};

const ShopSchema = mongoose.Schema({
  shopName: {
    ...stringOption,
    required: true,
  },

  owner: {
    ...stringOption,
    required: true,
  },

  username: {
    ...stringOption,
    required: true,
  },

  password: {
    ...stringOption,
    required: true,
  },

  finance: {},
  products: [ProductSchema],
  supplies: [ItemSchema],
  equipment: [ItemSchema],
  transactionHistory: [TransactionSchema],
});

const Shop = mongoose.model("Shop", ShopSchema);
export default Shop;
