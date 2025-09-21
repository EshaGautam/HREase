import mongoose from "mongoose";
import { hashPassword } from "../services/authService.js";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
//   designation: { type: String, required: true },
//   role: {
//     type: String,
//     enum: ["admin", "manager", "developer"],
//     default: "admin",
//   },
//   joiningDate: { type: Date, required: true },
//   dob: { type: Date, required: true },
//   leaves: {
//     sickLeaves: { type: Number, default: 12 },
//     casualLeaves: { type: Number, default: 12 },
//     earnedLeaves: { type: Number, default: 12 },
//   },
//   createdAt: { type: Date, default: Date.now },
  
});

userSchema.pre("save",async function(next){

  let hashedPassword = await hashPassword()
  this.password = hashedPassword;
  next()
})

export const User = mongoose.model("User", userSchema);
