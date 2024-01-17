import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
    {
        club_id: {
            type: String,
            required: "The club_id is required",
        },
        room_name: {
            type: String,
            required: "The room_name is required",
        },
        max_capacity: {
            type: Number,
            required: "Your Max_room_capacity is required",
            default: 30
        },
        actual_capacity: {
            type: Number,
            required: "actual_capacity is required",
            default: 0
        },
        activities: {
            type: Array,
            required: "Your Activities are required",
            default: [],
        },
        inventory: {
            type: Array,
            required: "Inventory is required",
            select: false,
            default: [],
        }
    },
    { 
        timestamps: true 
    }
);



export default mongoose.model("rooms", RoomSchema);
