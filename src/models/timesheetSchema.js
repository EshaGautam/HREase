import mongoose from "mongoose";

const timesheetSchema= new mongoose.Schema({})


export const Timesheet = mongoose.model("Timesheet", timesheetSchema);