import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({});

export const Leave = mongoose.model("Leave", leaveSchema);
