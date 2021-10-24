import mongoose from "mongoose";
import {
  MODEL_ITEM,
  MODEL_PRODUCT,
  MODEL_TRANSACTION,
} from "../constants/Constants.js";

const { Schema } = mongoose;
export const TransactionSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["SELL", "BUY"],
    required: true,
  },

  date: {
    type: Date,
    default: Date.now(),
  },

  items: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: MODEL_ITEM,
      },

      product: {
        type: Schema.Types.ObjectId,
        ref: MODEL_PRODUCT,
      },

      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Transaction = mongoose.model(MODEL_TRANSACTION, TransactionSchema);
export default Transaction;
