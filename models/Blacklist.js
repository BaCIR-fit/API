import mongoose from "mongoose";

const BlacklistSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            ref: "users",
        },
    },
    { timestamps: true }
);
export default mongoose.model("blacklist", BlacklistSchema);
