import express from "express";
import { check } from "express-validator";
import Validate  from "../middleware/validate.js";
import { AddActivity, EditActivity, DeleteActivity } from "../controllers/activity.js";
import { Verify,VerifyRole,VerifyAdmin } from "../middleware/verify.js";

const activityRouter = express.Router();

// add activity route -- POST request
activityRouter.post("/add",VerifyAdmin,
    check("activity_name")
        .not()
        .isEmpty()
        .withMessage("Votre nom d'activité est requis")
        .trim()
        .escape(),
    check("coach_name")
        .not()
        .isEmpty()
        .withMessage("Votre nom de coach est requis")
        .trim()
        .escape(),
    check("activity_date")
        .not()
        .isEmpty()
        .withMessage("La date de l'activité est requis")
        .trim()
        .escape(),
    check("activity_time_duration")
        .not()
        .isEmpty()
        .withMessage("La durée de l'activité est requis")
        .trim()
        .escape(),
    check("room_id")
        .not()
        .isEmpty()
        .withMessage("La salle est requise")
        .trim()
        .escape(),
    check("club_id")
        .not()
        .isEmpty()
        .withMessage("Le club est requise")
        .trim()
        .escape(),
    Validate,
    AddActivity
     //#swagger.tags = ['Admin/Activity']

);

// Edit route == POST request
activityRouter.post(
        "/edit/:id",VerifyAdmin,
        check("activity_name")
        .not()
        .isEmpty()
        .withMessage("Votre nom d'activité est requis")
        .trim()
        .escape(),
    check("coach_name")
        .not()
        .isEmpty()
        .withMessage("Votre nom de coach est requis")
        .trim()
        .escape(),
    check("activity_date")
        .not()
        .isEmpty()
        .withMessage("La date de l'activité est requis")
        .trim()
        .escape(),
    check("activity_time_duration")
        .not()
        .isEmpty()
        .withMessage("La durée de l'activité est requis")
        .trim()
        .escape(),
    check("participant_max")
        .not()
        .isEmpty()
        .withMessage("Le nombre de participant maximum est requis")
        .trim()
        .escape(),
    check("participant_signin")
        .not()
        .isEmpty()
        .withMessage("Le nombre de participant est requis")
        .trim()
        .escape(),
    check("club_id")
        .not()
        .isEmpty()
        .withMessage("Le club est requise")
        .trim()
        .escape(),
    Validate,
    EditActivity
     //#swagger.tags = ['Admin/Activity']

);

// delete route == GET request
activityRouter.get(
    "/delete/:id",VerifyAdmin,
    Validate, 
    DeleteActivity
     //#swagger.tags = ['Admin/Activity']
);


export default activityRouter;