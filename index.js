import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";
import shopRoute from "./routes/shop.js";

dotenv.config();
const app = express();

// Add middleware
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect static files
app.use("/public", express.static(process.cwd() + "/public"));

// Root route
app.route("/").get((req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

// User Route
app.use("/user", userRoute);

// Shop Route
app.use("/shop", shopRoute);

// Connect backend to mongodb
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => {
    console.log(error.message);
  });
