import express from "express";
import Validate from "../middleware/validate.js";
import { check } from "express-validator";
import Clubs from "../models/Clubs.js";
import { addClub, deleteClub, editClub, getAllClubs, getClubById } from "../controllers/clubs.js";
import { Verify, VerifyRole } from "../middleware/verify.js";
const clubRouter = express.Router();

// Create club == POST request
clubRouter.post("/addClub",Verify,VerifyRole,addClub
// #swagger.tags = ['Admin/Clubs']
);

// Edit club == POST request
clubRouter.post("/editClub",Verify,VerifyRole,editClub// #swagger.tags = ['Admin/Clubs']
)

// Delete club == GET request
clubRouter.get("/deleteClub/:id",Verify,VerifyRole,deleteClub // #swagger.tags = ['Admin/Clubs']
)


// Get club by id == GET request
clubRouter.get("/getClubById/:id",Verify,VerifyRole,getClubById// #swagger.tags = ['Admin/Clubs']
)


// Get all clubs == GET request
clubRouter.get("/getAllClubs/:limit",getAllClubs// #swagger.tags = ['Admin/Clubs']
)

export default clubRouter;



