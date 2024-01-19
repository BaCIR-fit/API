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
var allowlist = ['http://example1.com', 'http://localhost:3001']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true,"credentials":true} // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  // console.log("here1")
  callback(null, corsOptions) // callback expects two parameters: error and options
  // console.log("here2")
}

server.use(cors(corsOptionsDelegate))
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
// let host = "10.224.1.119"
let host = "localhost"
server.listen(PORT,host, () =>
    console.log(`Server running on http://${host}:${PORT}`)

);