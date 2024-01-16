import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
    {
        activity_name: {
            type: String,
            required: "Your activity_name is required",
            max: 25,
        },
        coach_name: {
            type: String,
            required: "Your Coach_name is required",
            max: 25,
        },
        activity_date: {
            type: Date,
            required: "Your Activity_date is required",
            unique: true,
            lowercase: true,
            trim: true,
        },
        activity_time_duration: {
            type: String,
            required: "Your Activity_time_duration is required",
            select: false,
        },
        participant_max: {
            type: Number,
            required: "Your participant_max is required",
            default: "0",
        },
        participant_signin: {
            type: Number,
            required: "Your participant_signin is required",
            default: "0",
        },
    },
);


export default mongoose.model("activities", ActivitySchema);
