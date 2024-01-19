import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { SECRET_ACCESS_TOKEN } from '../config/index.js';
import md5 from "md5";

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

const convertToMd5 = (inputValue) => {
    const hash = md5(inputValue);
    return hash;
};
QrSchema.pre("save", function (next) {
    const qr = this;
    if (!qr.isModified("qr_value")) return next();
    qr.qr_value = convertToMd5(qr.user_id);
    next();

    // bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        
        bcrypt.hash(qr.user_id, salt, (err, hash) => {
            if (err) return next(err);
            qr.qr_value = hash;
            next();
        });
    // });
});




export default mongoose.model("qrcode", QrSchema,"qrcode");
