import mongoose, { Schema } from "mongoose";
import {
  MODEL_ITEM,
  MODEL_PRODUCT,
  MODEL_SHOP,
  MODEL_TRANSACTION,
  MODEL_USER,
} from "../constants/Constants";

const stringOption = {
  type: String,
  trim: true,
  minLength: 8,
  maxLength: 32,
};

export const ShopSchema = mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: MODEL_USER,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  name: {
    ...stringOption,
    required: true,
    unique: true,
  },

  imageUrl: {
    type: String,
  },

  currency: {
    type: String,
    required: true,
  },

  money: {
    type: Number,
    default: 0,
  },

  products: [
    {
      type: Schema.Types.ObjectId,
      ref: MODEL_PRODUCT,
    },
  ],

  supplies: [
    {
      type: Schema.Types.ObjectId,
      ref: MODEL_ITEM,
    },
  ],

  equipment: [
    {
      type: Schema.Types.ObjectId,
      ref: MODEL_ITEM,
    },
  ],

  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: MODEL_TRANSACTION,
    },
  ],
});

export const Shop = mongoose.model(MODEL_SHOP, ShopSchema);
