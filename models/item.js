import mongoose from "mongoose";

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
  measurmentUnit: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  currencyIsoCode: {
    type: String,
    required: true,
  },
  pricePerUnit: {
    type: Number,
    required: true,
  },
});

export const Item = mongoose.model("Supply", ItemSchema);
