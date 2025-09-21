import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    leaveType: { type: String, enum: ["sick", "casual", "earned"], required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    numberOfDays: { type: Number, required: true },
    startDate: { type: Date, required: true },
});

export const Leave = mongoose.model("Leave", leaveSchema);
