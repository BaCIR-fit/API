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
            required: "Your unity_furniture is required",
            max: 25,
            default:0
        },
        room: {
            type: String,
            required: "Your room is required",
            unique: true,
        },
    },
);


export default mongoose.model("inventory", InventaireSchema);
