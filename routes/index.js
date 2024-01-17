import express from "express"; // import the express module
import authRouter from './auth.js';
import adminApp from "./admin.js";
import userRouter from "./user.js";

import { Verify } from "../middleware/verify.js";
const app = express(); // Create an app object


// home route with the get method and a handler
app.get("/",Verify, (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            message: "Welcome to our API homepage!",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error : "+err,
        });
    }
});



app.use('/auth', authRouter); // auth => public
app.use('/admin', adminApp); // admin section => Restricted Admin only
app.use('/user', userRouter); // user section => Restricted User only

export default app;
