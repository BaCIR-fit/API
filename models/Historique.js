import mongoose from "mongoose";

const HistoriqueSchema = new mongoose.Schema(
    {
        workout_date: {
            type: Date,
            required: "Your Historique_id is required",
            unique: true,
            lowercase: true,
            trim: true,
            default:"12-12-2023"
        },
        workout_time: {
            type: timestamps,
            required: "Your Historique_name is required",
            max: 25,
        },
        workout_duration: {
            type: int,
            required: true,
            default: "0",
        },
        localisation: {
            type: String,
            required: "Your Localisation is required",
        },
        user_id: {
            type: String,
            required: "Your User_id is required",
        },
    },
    { 
        timestamps: true 
    }
);


export default mongoose.model("Historique", HistoriqueSchema);
