import room from "../models/Room.js";

// CREATE, EDIT, DELETE, GET

/**
 * @route POST v1/room/getAllRoom/:limit
 * @desc Get all room
 * @access Public
 */
export async function getAllRoom(req, res) {
    // récupère toutes les salles
    let data = room.find({},(err,rooms)=>{
        return res.status(400).json({
            status: "failed",
            data: [rooms],
            message: "Erreur lors de la récupération des utilisateurs" 
            + err,
        });
    }).limit(req.params.limit);
    return res.json(data);
}