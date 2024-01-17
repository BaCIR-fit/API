import room from "../models/Room.js";
import inventory from "../models/Inventory.js";

// CREATE, EDIT, DELETE, GET

/**
 * @route POST v1/room/getAllRoom/:limit
 * @desc Get all room
 * @access Public
 */
export async function getAllRoom(req, res) {
    // récupère toutes les salles
    let limit_ = req.params.limit?req.params.limit:100;
    room.find({})
    .limit(limit_)
    .then(allRoom => {
        return res.status(200).json({
            status: "success",
            data: [allRoom],
            message: "Get ok "
        });
    }).catch((err) => {
        return res.status(400).json({
            status: "failed",
            message: "Erreur lors de la récupération des informations pour la salle: " + err,
        });
    }); 
}

/**
 * @route POST v1/room/getRoom/:id
 * @desc Get room
 * @access Public
 */
export async function getRoom(req, res){
    // récupère la salle avec son id
    room.find({_id: req.params.id}).then(rooms => {
        return res.status(200).json({
            status: "success",
            data: [rooms],
            message: "Get ok "
        });
    }).catch((err) => {
        return res.status(400).json({
            status: "failed",
            data: ["error "],
            message: "Erreur lors de la récupération des informations pour la salle: " + err,
        });
    });  
}


/**
 * @route POST v1/room/getRoomsClub/:id
 * @desc Get rooms by club id
 * @access Public
 */
export async function getRoomsClub(req, res){
    // récupère la salle avec son club id
    room.find({club_id: req.params.id}).then(rooms => {
        return res.status(200).json({
            status: "success",
            data: [rooms],
            message: "Get ok "
        });
    }).catch((err) => {
        return res.status(400).json({
            status: "failed",
            data: ["error "],
            message: "Erreur lors de la récupération des informations pour la salle: " + err,
        });
    });  
}

/**
 * @route POST v1/room/add
 * @desc Create room
 * @access Admin
 */
export async function addRoom(req, res) {
    // get required variables from request body, using es6 object destructing
    const { club_id, room_name, max_capacity} = req.body;
    try {
        // create an instance of an room
        const newRoom = new room({
            club_id,
            room_name,
            max_capacity
        });
        // Check if room already exists
        const existingRoom = await room.findOne({ club_id, room_name });
        if (existingRoom)
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "Il semble qu'il y a déja une salle à ce nom.",
            });
        const savedRoom = await newRoom.save(); // save new room into the database
        const { role, ...room_data } = savedRoom._doc;
        res.status(200).json({
            status: "success",
            data: [room_data],
            message:
                "La salle a été créé avec succès.",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,  
            data: [],
            message: "Internal Server Error : "+ err,
        });
    }
    res.end();
}

/**
 * @route POST /room/edit/:id
 * @desc edit room
 * @access Admin
 */
export async function editRoom(req, res) {
    try{
        // modifie les informations de l'activité, sauf le mot de passe
        let data = await room.findOne({_id: req.params.id})
        room.updateOne({_id:data._id},{room_name:req.body.room_name, max_capacity:req.body.max_capacity, inventory:req.body.inventory}).then(rooms => {
            return res.status(200).json({
                status: "success",
                data: [rooms],
                message: "Modif ok "
            });
        }).catch((err) => {
            return res.status(400).json({
                status: "failed",
                data: ["error "],
                message: "Erreur lors de la récupération des informations: " + err,
            });
        });   
    }
    catch (err) {
        return res.status(400).json({
            status: "failed",
            data: ["error "],
            message: "Erreur lors de la récupération des informations: " + err,
        });
    }
}


/**
 * @route POST v1/room/deleteRoom/:id
 * @desc Delete room by id
 * @access Admin
 */
export async function deleteRoom(req, res){
    room.deleteOne({_id: req.params.id}).then(data => {
        return res.status(200).json({
            data: [data],
            message: data.deletedCount == 1 ? "room deleted" : "Unable to delete the room"
        })

    }).catch(err => {
        return res.status(400).json({
            status: "failed",
            message: "Erreur lors de la suppression de la salle : "+ err,
        })
    })
}



export async function incrementRoom(id){
    try{
        let data = await room.findOne({_id: id})
        room.updateOne({_id:data._id},{actual_capacity: data.actual_capacity + 1}).then(rooms => {
            return rooms
        }).catch((err) => { return err });   
    } catch (err) { return err }
}


export async function decrementRoom(id){
    try{
        let data = await room.findOne({_id: id})
        room.updateOne({_id:data._id},{actual_capacity: data.actual_capacity - 1}).then(rooms => {
            return rooms
        }).catch((err) => { return err });   
    } catch (err) { return err }
}


/**
 * @route POST v1/room/decrement/:id
 * @desc Decrement capacity by id
 * @access Admin
 */
export async function resetRoom(req, res){
    try{
        // modifie les informations de l'activité, sauf le mot de passe
        let data = await room.findOne({_id: req.params.id})
        room.updateOne({_id:data._id},{actual_capacity: 0}).then(rooms => {
            return res.status(200).json({
                status: "success",
                data: [rooms],
                message: "Reset ok "
            });
        }).catch((err) => {
            return res.status(400).json({
                status: "failed",
                data: ["error "],
                message: "Erreur lors de la récupération des informations: " + err,
            });
        });   
    }
    catch (err) {
        return res.status(400).json({
            status: "failed",
            data: ["error "],
            message: "Erreur lors de la récupération des informations: " + err,
        });
    }
}


/**
 * @route GET v1/room/getInventory/:id
 * @desc get inventory by room id
 * @access Public
 */
export async function getInventory(req, res){
    // récupère l'inventaire de la salle avec son id
    room.find({_id: req.params.id}).then(getAll => {
        return res.status(200).json({
            status: "success",
            data: [getAll.inventory],
            message: "Get ok "
        });
    }).catch((err) => {
        return res.status(400).json({
            status: "failed",
            data: ["error "],
            message: "Erreur lors de la récupération des informations pour l'inventaire de la salle: " + err,
        });
    });  
}


/**
 * @route POST v1/room/getNbInventory/:id
 * @desc number of inventory by room id
 * @access Admin
 */
export async function getNbInventory(req, res){
    // récupère l'inventaire de la salle avec son id
    room.find({_id: req.params.id}).then(getAll => {
        return res.status(200).json({
            status: "success",
            data: [getAll.inventory.length],
            message: "Get nb ok "
        });
    }).catch((err) => {
        return res.status(400).json({
            status: "failed",
            data: ["error "],
            message: "Erreur lors de la récupération des informations pour l'inventaire de la salle: " + err,
        });
    });  
}


/**
 * @route POST v1/room/updateInventory/:id
 * @desc update inventory by room id
 * @access Admin
 */
export async function updateInventory(req, res){
    // récupère l'inventaire de la salle avec son id
    // receive : id de la salle + nouvel inventaire (en mode [])
    try{
        // modifie les informations du client, sauf le mot de passe
        let data = await room.findOne({ _id: req.params.id})
        room.updateOne({_id:data.id},{inventory:req.body.inventory}).then(rooms => {
            return res.status(200).json({
                status: "success",
                data: rooms,
                message: "Modif ok" 
            }); 
    }).catch (err =>{
        return res.status(400).json({
            status: "failed",
            data: ["error"],
            message: "Erreur lors de la modification du club : " + err,
        });
    });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,  
            message: "Internal Server Error : " + err,
        });
    } 
}
