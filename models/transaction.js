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
    enum: ["ADD", "SUBTRACT"],
    required: true,
  },

  date: {
    type: Date,
    default: Date.now(),
  },

  note: {
    type: String,
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
