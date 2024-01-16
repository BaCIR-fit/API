import express from "express";
import Validate from "../middleware/validate.js";
import { check } from "express-validator";
import { Edit } from "../controllers/auth.js";

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
)