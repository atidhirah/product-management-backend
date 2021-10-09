import mongoose from "mongoose";
import { ItemSchema } from "./item";

const TransactionItemSchema = mongooseSchema({
  item: {
    type: ItemSchema,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export const TransactionSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["SELL", "BUY"],
    required: true,
  },

  items: [TransactionItemSchema],
});

export const Transaction = mongoose.model("Transaction", TransactionSchema);
