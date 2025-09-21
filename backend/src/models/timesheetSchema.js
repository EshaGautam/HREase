import mongoose from "mongoose";

const timesheetSchema= new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    date: { type: Date, required: true },
    hoursWorked: { type: Number, required: true, min: 0, max: 24 },
    description: { type: String },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})


export const Timesheet = mongoose.model("Timesheet", timesheetSchema);