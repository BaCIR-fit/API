import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { SECRET_ACCESS_TOKEN } from '../config/index.js';

const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: "Your first_name is required",
            default:"fname",
            max: 25,
        },
        last_name: {
            type: String,
            required: "Your last_name is required",
            default:"sname",
            max: 25,
        },
        birth_date: {
            type: Date,
            required: "Your birth_date is required",
            default:"1960-08-05T00:00:00.000Z",
            lowercase: true,
            trim: true,
        },
        logs: {
            type: Array,
            required: "Your logs are required",
            select: false,
            default: []
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        isActive: {
            type: Boolean,
            required: true,
            default: false,
        },
        gender: {
            type: String,
            required: "Your gender is required",
            max: 10,
            default:"Male"
        },
        email: {
            type: String,
            required: "Your email is required",
            max: 25,
            unique:true,
            default:"verybademail@gmail.com"
        },
        password: {
            type: String,
            required: "Your password is required",
            select: true,
            max: 64,
        },
    },
    { 
        timestamps: true 
    }
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

UserSchema.methods.generateAccessJWT = function () {
    let payload = {
      id: this._id,
    };
    return jwt.sign(payload, SECRET_ACCESS_TOKEN, {
      expiresIn: '20m',
    });
  };

export default mongoose.model("users", UserSchema,"users");
