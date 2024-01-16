import mongoose from "mongoose";

const InventaireSchema = new mongoose.Schema(
    {
        name_furniture: {
            type: String,
            required: "Your name_furniture is required",
            max: 25,
        },
        unity_furniture: {
            type: String,
            required: "Your Coach_name is required",
            max: 25,
            default:"coachtest"
        },
        room: {
            type: Date,
            required: "Your Activity_date is required",
            unique: true,
            lowercase: true,
            trim: true,
            default:"12-12-2023"

        },
    },
);


export default mongoose.model("activities", InventaireSchema);
