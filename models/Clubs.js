import mongoose from "mongoose";

const ClubsSchema = new mongoose.Schema(
    {
        club_name: {
            type: String,
            required: "The club_name is required",
            unique:true
        },
        club_manager: {
            type: String,
            required: "A manager is required",
            default:"ProductOwner"
        },
        adress:{
            type:String,
            required:"Adress is required"
        },
        latitude:{
            type:String,
            required:"latitude coords are required"
        },
        longitude:{
            type:String,
            required:"longitude coords are required"
        },
        room_number: {
            type: Number,
            required: true,
            default: "0",
        },
        rooms: {
            type: Array,
            required: true,
            default: [],
        },
        cap_actu: {
            type: Number,
            required: true,
            default: "0",
        },
        cap_max: {
            type: Number,
            required: true,
            default: "0",
        },
    },
    { 
        timestamps: true 
    }
);


export default mongoose.model("clubs", ClubsSchema,"clubs");
