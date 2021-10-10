import mongoose from "mongoose";
import { ItemSchema } from "./item";

const IngredientSchema = mongoose.Schema({
  item: {
    type: ItemSchema,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
});

export const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  currencyIsoCode: {
    type: String,
    required: true,
  },
  priceNominal: {
    type: Number,
    required: true,
  },
  ingredients: [IngredientSchema],
});

export const Product = mongoose.model("Product", ProductSchema);
