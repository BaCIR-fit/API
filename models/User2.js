import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ThingSchema = new Schema({
  name: {
    type: String
  }
});

export default mongoose.model('utilisateurs', ThingSchema, 'utilisateurs');
