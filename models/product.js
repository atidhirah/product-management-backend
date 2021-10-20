import mongoose from "mongoose";
import { MODEL_ITEM, MODEL_PRODUCT } from "../constants/Constants.js";

const { Schema } = mongoose;
export const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  currency: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ingredients: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: MODEL_ITEM,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

export const Product = mongoose.model(MODEL_PRODUCT, ProductSchema);
