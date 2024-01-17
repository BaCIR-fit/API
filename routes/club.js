import express from "express";
import Validate from "../middleware/validate.js";
import { check } from "express-validator";
import Clubs from "../models/Clubs.js";
import { addClub, deleteClub, editClub, getAllClubs, getClubById } from "../controllers/clubs.js";
import { Verify, VerifyRole } from "../middleware/verify.js";
const clubRouter = express.Router();

// Create club == POST request
clubRouter.post("/addClub",Verify,VerifyRole,addClub
// #swagger.tags = ['admin/clubs']
);


// Edit club == POST request
clubRouter.post("/editClub",Verify,VerifyRole,editClub// #swagger.tags = ['admin/clubs']
)


// Delete club == GET request
clubRouter.get("/deleteClub/:id",Verify,VerifyRole,deleteClub // #swagger.tags = ['admin/clubs']
)


// Get club by id == GET request
clubRouter.get("/getClubById/:id",Verify,VerifyRole,getClubById// #swagger.tags = ['admin/clubs']
)


// Get all clubs == GET request
clubRouter.get("/getAllCubs/:limit",Verify,VerifyRole,getAllClubs// #swagger.tags = ['admin/clubs']
)

export default clubRouter;



