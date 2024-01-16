import express from "express";
import Validate from "../middleware/validate.js";
import { getAllRoom } from "../controllers/room.js";

const roomRouter = express.Router();

// Get all room == GET request
roomRouter.getAll(
    "/getAllRoom/:limit",
    Validate,
    getAllRoom
);

// get room by id == GET request


// get all room by club id == GET request


// create room == POST request


// update room == PUT request


// delete room == GET request


export default roomRouter;