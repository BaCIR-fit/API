import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
    {
        max_room_capacity: {
            type: Int,
            required: "Your Max_room_capacity is required",
        },
        actual_room_capacity: {
            type: Int,
            required: "Your Actual_room_capacity is required",
        },
        activities: {
            type: Array,
            required: "Your ACtivities is required",
            default: [],
        },
        inventaires: {
            type: Array,
            required: "Your Inventaires is required",
            select: false,
            default: [],
        },
        localisation: {
            type: String,
            required: "Your Localisation is required",
        },
        room_name: {
            type: String,
            required: "Your Room_name is required",
        },
    },
    { 
        timestamps: true 
    }
);



export default mongoose.model("rooms", RoomSchema);
