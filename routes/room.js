import express from "express";
import Validate from "../middleware/validate.js";
import { getAllRoom, getRoom, getRoomsClub, addRoom, deleteRoom, editRoom, incrementRoom,
         decrementRoom, resetRoom, getInventory,updateInventory, getNbInventory } from "../controllers/room.js";
import { Verify,VerifyAdmin,VerifyRole } from "../middleware/verify.js";
import { check } from "express-validator";
const roomRouter = express.Router();

// Get all room == GET request
roomRouter.get(
    "/getAllRoom/:limit",
    Validate,
    getAllRoom,
    // #swagger.tags = ['admin/rooms']

);

// get room by id == GET request
roomRouter.get(
    "/getRoom/:id",
    Validate,
    getRoom
    // #swagger.tags = ['admin/rooms']
);

// get all room by club id == GET request
roomRouter.get(
    "/getRoomsClub/:id",
    Validate,
    getRoomsClub
    // #swagger.tags = ['admin/rooms']
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
        .escape(),

    Validate,
    addRoom
    // #swagger.tags = ['admin/rooms']
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
    // #swagger.tags = ['admin/rooms']
)


// delete room == GET request
roomRouter.get(
    // #swagger.tags = ['admin/rooms']
    "/deleteRoom/:id",
    Validate,
    deleteRoom
)

// modify activity == POST request


// increment capacity == GET request
roomRouter.get(
    "/increment/:id",
    Validate,
    incrementRoom
    // #swagger.tags = ['admin/rooms']

)


// decrement capacity == GET request
roomRouter.get(
    "/decrement/:id",
    Validate,
    decrementRoom
    // #swagger.tags = ['admin/rooms']

)

// reset capacity == GET request
roomRouter.get(
    "/reset/:id",
    Validate,
    resetRoom
    // #swagger.tags = ['admin/rooms']
)

// INVENTORY
// get inventaire by room id == GET request
roomRouter.get(
    "/getInventory/:id",
    Validate,
    getInventory
    // #swagger.tags = ['admin/rooms']
)

// get number of equipement from inventary id and equipment id == GET request
roomRouter.get(
    "/getNbInventory/:id",
    Validate,
    getNbInventory
    // #swagger.tags = ['admin/rooms']

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
    // #swagger.tags = ['admin/rooms']
)


export default roomRouter;