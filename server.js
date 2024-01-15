// const express =  require("express");
// const cors = require("cors");
// // var cookieParser = ('cookie-parser');
// // const mongoose = ("mongoose");
// const { PORT, URI } = ("./config/index.js");
// const app = ("./routes/index.js");
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import mongoose from "mongoose";
// import { PORT, URI } from "./config/index.js";
let PORT = 3000;
import app from "./routes/index.js";

// === 1 - CREATE SERVER ===
const server = express();
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json' with { type: "json" };
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// CONFIGURE HEADER INFORMATION
// Allow request from any source. In real production, this should be limited to allowed origins only
server.use(cors());
server.disable("x-powered-by"); //Reduce fingerprinting
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// // === 2 - CONNECT DATABASE ===
// // Set up mongoose's promise to global promise
// mongoose.promise = global.Promise;
// mongoose.set("strictQuery", false);
// mongoose
//     .connect(URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(console.log("Connected to database"))
//     .catch((err) => console.log(err));

// === 4 - CONFIGURE ROUTES ===
// Connect Main route to server
server.use(app);

// === 5 - START UP SERVER ===
server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);