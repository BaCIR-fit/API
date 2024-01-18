import express from "express";
import Validate from "../middleware/validate.js";
import { getAllRoom, getRoom, getRoomsClub, addRoom, deleteRoom, editRoom, 
         resetRoom, getInventory,updateInventory, getNbInventory } from "../controllers/room.js";
import { Verify,VerifyAdmin,VerifyRole } from "../middleware/verify.js";
import { check } from "express-validator";
const roomRouter = express.Router();

// Get all room == GET request
roomRouter.get(
    "/getAllRoom/:limit", VerifyAdmin,
    Validate,
    getAllRoom,
    // #swagger.tags = ['Admin/Rooms']

);

// get room by id == GET request
roomRouter.get(
    "/getRoom/:id", VerifyAdmin,
    Validate,
    getRoom
    // #swagger.tags = ['Admin/Rooms']
);

// get all room by club id == GET request
roomRouter.get(
    "/getRoomsClub/:id", VerifyAdmin,
    Validate,
    getRoomsClub
    // #swagger.tags = ['Admin/Rooms']
);

// create room == POST request
roomRouter.post(
    "/add", VerifyAdmin,
    check("club_id")
        .not()
        .isEmpty()
        .withMessage("L'id du club est requis")
        .trim()
        .escape(),
    check("room_name")
        .not()
        .isEmpty()
        .withMessage("Le nom de la salle est requis")
        .trim()
        .escape(),
    check("max_capacity")
        .not()
        .isEmpty()
        .withMessage("La capacité maximum est requis")
        .trim()
        .escape(),VerifyAdmin,
    Validate,
    addRoom
    // #swagger.tags = ['Admin/Rooms']
)


// edit room == POST request
roomRouter.post(
    "/edit/:id", VerifyAdmin,
    check("room_name")
        .not()
        .isEmpty()
        .withMessage("Le nom de la salle est requis")
        .trim()
        .escape(),
    check("max_capacity")
        .not()
        .isEmpty()
        .withMessage("La capacité maximum est requis")
        .trim()
        .escape(),
    check("inventory")
        .not()
        .isEmpty()
        .withMessage("L'inventaire est requis")
        .trim()
        .escape(),
    Validate,
    editRoom
    // #swagger.tags = ['Admin/Rooms']
)


// delete room == GET request
roomRouter.get(
    "/deleteRoom/:id", VerifyAdmin,
    Validate,
    deleteRoom
    // #swagger.tags = ['Admin/Rooms']
)


// reset capacity == GET request
roomRouter.get(
    "/reset/:id",VerifyAdmin,
    Validate,
    resetRoom
    // #swagger.tags = ['Admin/Rooms']
)

// INVENTORY
// get inventaire by room id == GET request
roomRouter.get(
    "/getInventory/:id",VerifyAdmin,
    Validate,
    getInventory
    // #swagger.tags = ['Admin/Rooms']
)

// get number of equipement from inventary id and equipment id == GET request
roomRouter.get(
    "/getNbInventory/:id",VerifyAdmin,
    Validate,
    getNbInventory
    // #swagger.tags = ['Admin/Rooms']

)

// update inventary by room id == POST request
roomRouter.post(
    "/updateInventory/:id",VerifyAdmin,
    check("inventory")
        .not()
        .isEmpty()
        .withMessage("L'inventaire est requis")
        .trim()
        .escape(),
    Validate,
    updateInventory,
    // #swagger.tags = ['Admin/Rooms']
)


export default roomRouter;