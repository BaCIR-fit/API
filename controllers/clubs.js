import clubs from "../models/Clubs.js";
// CREATE, EDIT, DELETE, GET

/**
 * @route POST admin/clubs/getAllClubs/:limit
 * @desc Get all clubs
 * @access admin
 */
export async function getAllClubs(req, res) {
    let limit_ = req.params.limit?req.params.limit:100;
    // récupère tous les clubs
    clubs.find({})
    .limit(limit_)
    .then(allclubs => {
        console.log("allclubs : ",allclubs)
        return res.status(200).json({
            data:JSON.stringify(allclubs)
        })
    })
    .catch(err => {
        return res.status(400).json({
            status:"failed",
            message: "Erreur lors de la récupération des clubs : "+ err,
        });
    })
    // return res.json(data);
}

/**
 * @route POST /admin/clubs/getClubById/:id
 * @desc Get club by id
 * @access Public
 */
export async function getClubById(req, res){
    // récupère un club donné
    clubs.findOne({_id:req.params.id}).then(clubfound => {
        return res.status(200).json({
            data:[clubfound]
        })
    })
    .catch(err => {
        return res.status(400).json({
            status:"failed",
            message: "Erreur dans la récupération du club "+req.params.id+" : "+ err,
        });
    })
}

/**
 * @route GET admin/clubs/deleteClub/:id
 * @desc delete club by id
 * @access Restricted
 */
export async function deleteClub(req, res){
    // récupère la salle avec son id
    clubs.deleteOne({_id: req.params.id}).then(data => {
        return res.status(200).json({
            data: [data],
            message: data.deletedCount == 1 ? "club deleted" : "Unable to delete the club"
        })

    }).catch(err => {
        return res.status(400).json({
            status: "failed",
            message: "Erreur lors de la suppression du club : "+ err,
        })
    })
    // return res.json(data);
}



/**
 * @route POST admin/clubs/addClub
 * @desc Create club
 * @access Admin
 */
export async function addClub(req, res) {
    // get required variables from request body, using es6 object destructing
    const {club_name, club_manager,adress,longitude,latitude, room_number, cap_max} = req.body;
        // Check if activity already exists
        clubs.findOne({ club_name:club_name}).then(clubFound => {
            if(clubFound) {
                return res.status(400).json({
                    status: "failed",
                    message: "Il semble qu'il y a déja un club à ce nom : "+clubFound,
                });
            }
            const newClub = new clubs({
                club_name,
                club_manager,
                adress,
                longitude,
                latitude,
                room_number,
                cap_max
            })
            newClub.save().then(savedClub => {
                return res.status(200).json({
                    status: "success",
                    message: "Le club a été créé avec succès.",
                    });
            })
        })
}



/**
 * @route POST admin/clubs/editClub/:id
 * @desc Create club
 * @access Admin
 */
export async function editClub(req, res) {  
    try{
        // modifie les informations du client, sauf le mot de passe
        let data = await clubs.findOne({ _id: req.params.id})
        clubs.updateOne({_id:data._id},{club_name:req.body.club_name, club_manager:req.body.club_manager, 
            adress:req.body.adress, latitude:req.body.latitude, longitude:req.body.longitude,room_number:req.body.room_number})
            .then(editedClub =>{
            return res.status(200).json({
                status: "success",
                data: editedClub,
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