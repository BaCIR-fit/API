import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { PORT, URI } from "./config/index.js";
//let PORT = 3000;
import app from "./routes/index.js";
console.log(PORT,URI)
// === 1 - CREATE SERVER + SWAGGER ===
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
mongoose.promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
    .connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("Connected to database"))
    .catch((err) => console.log(err));

// === 4 - CONFIGURE ROUTES ===
// Connect Main route to server
server.use(app);

// === 5 - START UP SERVER ===
console.log(PORT)
server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);