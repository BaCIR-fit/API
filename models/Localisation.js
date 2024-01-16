import mongoose from "mongoose";

const LocalisationSchema = new mongoose.Schema(
    {
        localisation_id: {
            type: Int,
            required: "Your Localisation_id is required",
        },
        localisation_name: {
            type: String,
            required: "Your Localisation_name is required",
            max: 25,
        },
        number_room: {
            type: BigInt,
            required: true,
            default: "0",
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

export default mongoose.model("localisation", LocalisationSchema);
