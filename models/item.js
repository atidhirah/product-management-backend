import mongoose from "mongoose";
import { MODEL_ITEM } from "../constants/Constants.js";

export const ItemSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["EQUIPMENT", "SUPPLY"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  measurmentUnit: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    required: true,
  },
  pricePerUnit: {
    type: Number,
    required: true,
  },
});
const Item = mongoose.model(MODEL_ITEM, ItemSchema);
export default Item;
