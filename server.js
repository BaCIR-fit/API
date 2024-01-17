import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { PORT, URI } from "./config/index.js"; // get the env vars from config dotenv
import app from "./routes/index.js";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json' with { type: "json" };
// import swaggerJSDoc from "swagger-jsdoc";


// const swaggerDefinition = {
//     openapi: '3.0.0',
//     info: {
//       title: 'Express API for JSONPlaceholder',
//       version: '1.0.0',
//     },
//   };
  
//   const options = {
//     swaggerDefinition,
//     // Paths to files containing OpenAPI definitions
//     apis: ['./routes/*.js'],
//   };
// const swaggerSpec = swaggerJSDoc(options);
  

// === 1 - CREATE SERVER + SWAGGER DOC ===
const server = express();
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


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

// === 5 - START UP SERVER ===
server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);