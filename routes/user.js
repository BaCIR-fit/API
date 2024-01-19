import express from "express";
import Validate from "../middleware/validate.js";
import { check } from "express-validator";
import { editProfile } from "../controllers/auth.js";
import { getLogs, getProfile, addUserActivity, deleteUserActivity, isActive, isNotActive, getActivity, getAllActivity } from "../controllers/user.js"
import { Verify } from "../middleware/verify.js";
//import { verify } from "jsonwebtoken";

const userRouter = express.Router();

// Edit route == POST request
userRouter.post("/editProfile", Verify,
    check("user_mail")
        .isEmail()
        .withMessage("Entrez un mail valide.")
        .normalizeEmail(),
    check("user_firstname")
        .not()
        .isEmpty()
        .withMessage("Votre nom est requis")
        .trim()
        .escape(),
    check("user_surname")
        .not()
        .isEmpty()
        .withMessage("Votre prénom est requis")
        .trim()
        .escape(),
    check("user_birth")
        .not()
        .isEmpty()
        .withMessage("Votre date de naissance est requise")
        .trim()
        .escape(),
    check("user_gender")
        .not()
        .isEmpty()
        .withMessage("Votre genre est requis")
        .trim()
        .escape(),
    Validate,
    editProfile
    //#swagger.tags = ['Users/']
)

// Get log route == GET request
userRouter.get("/getLogs/:id", Verify, getLogs, 
    //#swagger.tags = ['Users/']
)


// Get user infos route == GET request

userRouter.post("/getProfile",getProfile
    //#swagger.tags = ['Users/']
)

userRouter.post("/addUserActivity", Verify, addUserActivity
    //#swagger.tags = ['Users/']
)

userRouter.post("/deleteUserActivity", Verify, deleteUserActivity
    //#swagger.tags = ['Users/']
)

userRouter.get("/isActive", Verify, isActive
    //#swagger.tags = ['Users/']
)
    
userRouter.get("/isNotActive", Verify, isNotActive
    //#swagger.tags = ['Users/']
)

userRouter.get("/getActivity/:idClub", getActivity
    //#swagger.tags = ['Users/']
)

userRouter.get("/getAllActivity", getAllActivity
    //#swagger.tags = ['Users/']
)



export default userRouter;