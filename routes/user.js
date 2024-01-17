import express from "express";
import Validate from "../middleware/validate.js";
import { check } from "express-validator";
import { editProfile } from "../controllers/auth.js";
import { getLogs, getProfile, addUserActivity } from "../controllers/user.js"
import { Verify } from "../middleware/verify.js";

const userRouter = express.Router(
);

// Edit route == POST request
userRouter.post("/editProfile",
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
userRouter.get("/getLogs",getLogs
    //#swagger.tags = ['Users/']
)

// update log route == POST request
// userRouter.post(
//     "/addLog/:id",
//     check("workout_date")
//         .isEmail()
//         .withMessage("Entrez une date valide.")
//         .normalizeEmail(),
//     check("workout_time")
//         .not()
//         .isEmpty()
//         .withMessage("L'horaire de travail requis")
//         .trim()
//         .escape(),
//     check("workout_duration")
//         .not()
//         .isEmpty()
//         .withMessage("Le temps de travail est requis")
//         .trim()
//         .escape(),
//     check("localisation")
//         .not()
//         .isEmpty()
//         .withMessage("La localisation est requise")
//         .trim()
//         .escape(),
//     addLog
//     //#swagger.tags = ['Users/']
// )


// Get user infos route == GET request

userRouter.get("/getProfile",Verify,getProfile
    //#swagger.tags = ['Users/']
)

userRouter.post("/addUserActivity",Verify, addUserActivity
    //#swagger.tags = ['Users/']
)


export default userRouter;