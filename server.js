import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRouter from './routes/auth.js';
import adminRouter from "./routes/admin.js";
import activityRoute from "./routes/activity.js";
import { PORT, URI } from "./config/index.js"; // get the env vars from config dotenv
import app from "./routes/index.js";

// === 1 - CREATE SERVER + SWAGGER DOC ===
const server = express();


// CONFIGURE HEADER INFORMATION
// Allow request from any source. In real production, this should be limited to allowed origins only
server.use(cors());
server.disable("x-powered-by"); //Reduce fingerprinting
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// // === 2 - CONNECT DATABASE ===
// // Set up mongoose's promise to global promise
mongoose.promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose.connect(URI)
    .then(console.log("Connected to database BaCIR-fit"))
    .catch((err) => console.log("Error caught : "+err));

// === 4 - CONFIGURE ROUTES ===
// Connect Main route to server
server.use(app);


import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json' with { type: "json" };
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/activity', activityRoute);

// === 5 - START UP SERVER ===
server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);