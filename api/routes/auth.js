import express from "express";
import { Register } from "../controllers/auth.js";
import Validate from "../middleware/validate.js";
import { check } from "express-validator";

const router = express.Router();

// Register route -- POST request
router.post(
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
    check("Gender")
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
router.post(
    "/login",
    check("email")
        .isEmail()
        .withMessage("Entrez un mail valide")
        .normalizeEmail(),
    check("password").not().isEmpty(),
    Validate,
    Login
);

export default router;