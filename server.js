import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import mongoose from "mongoose";
import MongoClient from "mongodb";

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

const client = new MongoClient.MongoClient(URI,{useNewUrlParser: true});

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('activities');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }

  
async function run() {
    try {
      // Connect the client to the server
      await client.connect();
      // Establish and verify connection
      let t = await client.db("BaCIR-fit").collection("activities").findOne({}).then((res)=>{
        console.log(res)
      });
      console.log("Connected successfully to servedzaazdazd "+t);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
  
// client.connect(function (err) {
//     console.log("test")
//     const db = client.db("baCIR-fit");
//     findDocuments(db, function() {
//         client.close();
//     });
// });

      // database and collection code goes here
      // find code goes here
      // iterate code goes here
      
  
    //   const coll = db.collection("activities");

      // find code goes here
    //   const cursor = coll.find();
      // iterate code goes here
    //   await .forEach(console.log);
        // console.log(cursor)
        // for await (const variable of cursor) {
            // console.log(variable);
        //   }


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
console.log(PORT)
server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);