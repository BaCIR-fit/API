import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
    {
        activity_name: {
            type: String,
            required: "Your Activity_name is required",
            max: 25,
            default:"test2"
        },
        coach_name: {
            type: String,
            required: "Your Coach_name is required",
            max: 25,
            default:"coachtest"
        },
        activity_date: {
            type: Date,
            required: "Your Activity_date is required",
            unique: true,
            lowercase: true,
            trim: true,
            default:"12-12-2023"

        },
        activity_time_duration: {
            type: String,
            required: "Your Activity_time_duration is required",
            select: false,
            default:"tzdzdze"
        },
        participant_max: {
            type: BigInt,
            required: true,
            default: "0",

        },
        participant_signin: {
            type: BigInt,
            required: true,
            default: "0",
        },
    },
);

    // if (!activity.isModified("password")) return next();
    // bcrypt.genSalt(10, (err, salt) => {
    //     if (err) return next(err);

    //     bcrypt.hash(user.password, salt, (err, hash) => {
    //         if (err) return next(err);

    //         user.password = hash;
    //         next();
    //     });
    // });
    // if (err) return next(err);

export default mongoose.model("activities", ActivitySchema);
