import mongoose, { Schema } from "mongoose";
import { MODEL_SHOP, MODEL_USER } from "../constants/Constants";
import { ShopSchema } from "./shop";

const stringOption = {
  type: String,
  minLength: 8,
  maxLength: 32,
  trim: true,
};

const UserSchema = mongoose.Schema({
  name: {
    ...stringOption,
    required: true,
  },

  username: {
    ...stringOption,
    required: true,
    unique: true,
  },

  password: {
    ...stringOption,
    required: true,
  },

  shops: [
    {
      type: Schema.Types.ObjectId,
      ref: MODEL_SHOP,
    },
  ],
});

const User = mongoose.model(MODEL_USER, UserSchema);
export default User;
