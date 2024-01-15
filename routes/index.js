import express from "express"; // import the express module
import authRouter from './auth.js';
import adminRouter from "./admin.js";

const app = express(); // Create an app object
app.use('/auth', authRouter);
app.use('/admin', adminRouter);

app.disable("x-powered-by"); // Reduce fingerprinting (optional)
// home route with the get method and a handler
app.get("/", (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            data: [],
            message: "Welcome to our API homepage!",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
});
export default app;
