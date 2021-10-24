import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  EMAIL_EXIST,
  EMAIL_NOT_FOUND,
  SHOP_EXIST,
  SERVER_ERROR,
  WRONG_PASSWORD,
} from "../constants/Constants.js";
import User from "../models/user.js";
import Shop from "../models/shop.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email is already in database
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.json({ error: EMAIL_NOT_FOUND });

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) return res.json({ error: WRONG_PASSWORD });

    // Get Shop data
    const userShop = await Shop.findById(existingUser.shop);

    // Create token
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "TEST",
      { expiresIn: "1h" }
    );

    // Create result data
    const result = {
      _id: existingUser._id,
      fullname: existingUser.fullname,
      email: existingUser.email,
      shop: userShop,
    };

    // Return user data and token
    res.json({ result, token });
  } catch (error) {
    res.json({ error: SERVER_ERROR });
  }
};

export const register = async (req, res) => {
  const { fullname, email, password, confirmPassword, shop } = req.body;

  try {
    // Check if email is already in database
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({ error: EMAIL_EXIST });

    // Check if shopName is already in database
    const existingShopName = await Shop.findOne({ shop });
    if (existingShopName) return res.json({ error: SHOP_EXIST });

    // Check if password match with confirmPassword
    if (password !== confirmPassword)
      return res.json({ error: WRONG_PASSWORD });

    // Create new Shop
    const newShop = await Shop.create({
      shopName: shop,
    });

    // Create new User
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      shop: newShop._id,
    });

    // Create token
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, "TEST", {
      expiresIn: "1h",
    });

    // Create result
    const result = {
      _id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
      shop: newShop,
    };

    res.json({ result, token });
  } catch (error) {
    console.log(error);
    res.json({ error: SERVER_ERROR });
  }
};
