import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email is already in database
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    // Create token
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "TEST",
      { expiresIn: "1h" }
    );

    // Return user data and token
    res.status(200).json({ result: existingUser, token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    // Check if email is already in database
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: "Email already taken" });

    // Check if password match with confirmPassword
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password doesn't match." });

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

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
