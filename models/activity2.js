import mongoose from "mongoose";

new Schema({ url: String, text: String, id: Number}, 
    { collection : 'question' });   // collection name
