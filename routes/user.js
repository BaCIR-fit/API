import express from "express";
import Validate from "../middleware/validate.js";
import { check } from "express-validator";
import { Edit } from "../controllers/auth.js";
import { getLog, addLog, getUser } from "../controllers/user.js"

const userRouter = express.Router();

// Edit route == POST request
userRouter.post(
    "/editSelfUser",
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
    Edit
    //#swagger.tags = ['users/']
)

// Get log route == GET request
userRouter.get(
    "/getLog/:id",
    getLog
)

// update log route == POST request
userRouter.post(
    "/addLog/:id",
    check("workout_date")
        .isEmail()
        .withMessage("Entrez une date valide.")
        .normalizeEmail(),
    check("workout_time")
        .not()
        .isEmpty()
        .withMessage("L'horaire de travail requis")
        .trim()
        .escape(),
    check("workout_duration")
        .not()
        .isEmpty()
        .withMessage("Le temps de travail est requis")
        .trim()
        .escape(),
    check("localisation")
        .not()
        .isEmpty()
        .withMessage("La localisation est requise")
        .trim()
        .escape(),
    addLog
)


// Get user infos route == GET request

userRouter.get(
    "/getUser/:id",
    getUser
)



export default userRouter;