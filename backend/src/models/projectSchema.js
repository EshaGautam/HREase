import e from "express";
import mongoose from "mongoose";
import { FcManager } from "react-icons/fc";

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ["not started", "in progress", "completed","onHold"], default: "not started" },
    teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    billable: { type: Boolean, default: false },
    projectType: { type: String, enum: ["client", "internal"], default: "internal" },
 
}, { timestamps: true })


export const Project = mongoose.model("Project",  projectSchema );