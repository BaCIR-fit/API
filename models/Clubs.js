import mongoose from "mongoose";

const ClubsSchema = new mongoose.Schema(
    {
        club_id: {
            type: Int,
            required: "Your club_id is required",
        },
        club_name: {
            type: String,
            required: "Your club_name is required",
        },
        number_room: {
            type: BigInt,
            required: true,
            default: "0",
        },
    },
    { 
        timestamps: true 
    }
);


export default mongoose.model("clubs", ClubsSchema);
