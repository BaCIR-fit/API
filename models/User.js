import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
    {
        user_firstname: {
            type: String,
            required: "Your User_firstname is required",
            max: 25,
        },
        user_surname: {
            type: String,
            required: "Your User_surname is required",
            max: 25,
        },
        user_birth: {
            type: Date,
            required: "Your User_birth is required",
            unique: true,
            lowercase: true,
            trim: true,
        },
        historiques: {
            type: Array,
            required: "Your Historiques is required",
            select: false,
            default: "[]"
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        user_activity: {
            type: Boolean,
            required: true,
            default: false,
        },
        user_gender: {
            type: String,
            required: "Your User_gender is required",
            max: 25,
        },
        user_mail: {
            type: String,
            required: "Your mail is required",
            max: 25,
        },
        password: {
            type: String,
            required: "Your password is required",
            select: false,
            max: 25,
        },
    },
    { timestamps: true }
);

UserSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

export default mongoose.model("users", UserSchema);
