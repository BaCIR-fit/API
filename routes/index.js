import express from "express"; // import the express module
import authRouter from './auth.js';
import adminRouter from "./admin.js";
import activityRoute from "./activity.js";
import { Verify } from "../middleware/verify.js";
const app = express(); // Create an app object
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/activity', activityRoute);


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
export default app;
