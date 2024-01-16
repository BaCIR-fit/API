import mongoose from "mongoose";

const HistoriqueSchema = new mongoose.Schema(
    {
        workout_date: {
            type: Date,
            required: "Your Historique_id is required",
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
    { timestamps: true }
);

// ActivitySchema.pre("save", function (next) {
//     const activity = this;
//     if (!activity.isModified("password")) return next();
//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) return next(err);

//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if (err) return next(err);

//             user.password = hash;
//             next();
//         });
//     });
// });

export default mongoose.model("Historique", HistoriqueSchema);
