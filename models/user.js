import mongoose from "mongoose";
import { MODEL_SHOP, MODEL_USER } from "../constants/Constants.js";

const { Schema } = mongoose;
const UserSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  shop: {
    type: Schema.Types.ObjectId,
    ref: MODEL_SHOP,
  },
});

const User = mongoose.model(MODEL_USER, UserSchema);
export default User;
