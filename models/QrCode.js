import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { SECRET_ACCESS_TOKEN } from '../config/index.js';

const QrSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: "user_id is required"
        },
        qr_value: {
            type: String,
            required: "is_req",
        },
    },
    { 
        timestamps: true 
    }
);

QrSchema.pre("save", function (next) {
    const qr = this;
    if (!qr.isModified("qr_value")) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(qr.user_id, salt, (err, hash) => {
            if (err) return next(err);
            qr.qr_value = hash;
            next();
        });
    });
});

export default mongoose.model("qrcode", QrSchema,"qrcode");
