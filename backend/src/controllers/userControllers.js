import { User } from "../models/userSchema.js";
import { comparePassword } from "../services/authService.js";

export const registerUser = (req, res, next) => {
  let { name, email, password } = req.body;
  let user = new User({ name, email, password });
  user.save();
  console.log(req.body);
  res.status(200).json({
    success: true,
    message: "User registered successfully",
  });
};

export const getAllUsers = async (req, res, next) => {
  let users = await User.find();
  console.log(users);
  res.status(200).json({
    success: true,
    message: "All users fetched successfully",
  });
};
export const loginUser = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    let user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist with this email" });
    }

    let matchPassword = await comparePassword(password, user.password);

    if (!matchPassword) {
      return res
        .status(401)
        .json({ message: "You have entered the wrong password" });
    }

    res.status(200).json({ message: "You logged in successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
