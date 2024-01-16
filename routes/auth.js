import express from "express";
import { Register,Login } from "../controllers/auth.js";
import Validate from "../middleware/validate.js";
import { check } from "express-validator";
import { Edit } from "../controllers/auth.js";
import { Logout } from "../controllers/auth.js";
const authRouter = express.Router();

// Register route -- POST request
authRouter.post(
    "/register",
    check("email")
        .isEmail()
        .withMessage("Entrez un mail valide.")
        .normalizeEmail(),
    check("first_name")
        .not()
        .isEmpty()
        .withMessage("Votre nom est requis")
        .trim()
        .escape(),
    check("last_name")
        .not()
        .isEmpty()
        .withMessage("Votre prénom est requis")
        .trim()
        .escape(),
    check("birth_date")
        .not()
        .isEmpty()
        .withMessage("Votre date de naissance est requise")
        .trim()
        .escape(),
    check("gender")
        .not()
        .isEmpty()
        .withMessage("Votre genre est requis")
        .trim()
        .escape(),
    check("password")
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("Doit être de 8 charactères minimum"),
    Validate,
    Register
);

// Login route == POST request
authRouter.post(
    "/login",
    check("email")
        .isEmail()
        .withMessage("Entrez un mail valide")
        .normalizeEmail(),
    check("password").not().isEmpty(),
    Validate,
    Login
);



// Logout route == GET request
authRouter.get("/logout", Logout);

export default authRouter;