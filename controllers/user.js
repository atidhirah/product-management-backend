import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  EMAIL_EXIST,
  EMAIL_NOT_FOUND,
  SERVER_ERROR,
  WRONG_PASSWORD,
} from "../constants/Constants.js";
import User from "../models/user.js";

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

    // Create token
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "TEST",
      { expiresIn: "1h" }
    );

    // Return user data and token
    res.json({ result: existingUser, token: token });
  } catch (error) {
    res.json({ error: SERVER_ERROR });
  }
};

export const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    // Check if email is already in database
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({ error: EMAIL_EXIST });

    // Check if password match with confirmPassword
    if (password !== confirmPassword)
      return res.json({ error: WRONG_PASSWORD });

    // Create new User
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    // Create token
    const token = jwt.sign({ email: result.email, id: result._id }, "TEST", {
      expiresIn: "1h",
    });

    res.json({ result, token });
  } catch (error) {
    res.json({ error: SERVER_ERROR });
  }
};
