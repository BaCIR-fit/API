import activities from "../models/Activity.js";

/**
 * @route POST /activity/add
 * @desc Add activity
 * @access Admin
 */
export async function AddActivity(req, res) {
    // get required variables from request body, using es6 object destructing
    const { activity_name, coach_name, activity_date, activity_time_duration, room_id, club_id} = req.body;
    try {
        // create an instance of an activity
        const newActivity = new activities({
            activity_name,
            coach_name,
            activity_date,
            activity_time_duration,
            room_id,
            club_id
        });
        // Check if activity already exists
        const existingActivity = await activities.findOne({ activity_date: activity_date, activity_time_duration: activity_time_duration, club_id: club_id, room_id: room_id });
        if (existingActivity)
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "Il semble qu'il y a déja une activité à ce créneau.",
            });
        const savedActivity = await newActivity.save(); // save new activity into the database
        const { role, ...activity_data } = savedActivity._doc;
        res.status(200).json({
            status: "success",
            data: [activity_data],
            message:
                "L'activité a été créé avec succès.",
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
 * @route POST /activity/edit/:id
 * @desc edit activity
 * @access Admin
 */
export async function EditActivity(req, res) {
    try{
        // modifie les informations de l'activité, sauf le mot de passe
        let data = await activities.findOne({_id: req.params.id})
        console.log(data)
        activities.updateOne({_id:data._id},{activity_name:req.body.activity_name, coach_name:req.body.coach_name, 
            activity_date:req.body.activity_date, activity_time_duration:req.body.activity_time_duration, 
            participant_max:req.body.participant_max,participant_signin:req.body.participant_signin, club_id:req.body.club_id }).then(activity => {
            return res.status(200).json({
                status: "success",
                data: [activity],
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
 * @route GET /activity/delete/:id
 * @desc edit activity
 * @access Admin
 */
export async function DeleteActivity(req, res) {
    try{
        // supprime l'activité
        let data = await activities.findOne({ _id: req.params.id })

        activities.deleteOne({_id:data.id}).then(response =>{
            console.log(response)
            return res.status(200).json({
                status: "success",
                message: "Delete ok" 
            });
        }).catch((err) => {
            return res.status(400).json({
                status: "failed",
                data: ["error"],
                message: "Erreur dans la suppression de l'activité : " + err,
            });
        });  
    }
    catch (err) {
        return res.status(400).json({
            status: "failed",
            data: ["error "],
            message: "Erreur l'activité n'existe pas: " + err,
        });
    }
}


export async function incrementActivity(id) {
    try{
        let data = await activities.findOne({_id: id})
        activities.updateOne({_id:data._id},{participant_signin: data.participant_signin + 1}).then(activity => {
            return activity
        }).catch((err) => { return err });   
    } catch (err) { return err }
}

export async function decrementActivity(id) {
    try{
        let data = await activities.findOne({_id: id})
        // check if participant_signin is not 0
        if(data.participant_signin <= 0){
            return res.status(400).json({
                status: "failed",
                message: "L'activité est vide"
            });
        }
        activities.updateOne({_id:data._id},{participant_signin: data.participant_signin - 1}).then(activity => {
            return activity
        }).catch((err) => { return err });   
    } catch (err) { return err }
}
