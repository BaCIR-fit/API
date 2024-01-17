import users from '../models/User.js';
import { incrementRoom } from "../controllers/room.js";
import { incrementActivity } from "../controllers/activity.js"
import activities from "../models/Activity.js";

/**
 * @route GET v1/user/getLog/:id/
 * @desc Get history of user
 * @access Public
 */
export async function getLogs(req, res){
    users.findOne({_id: req.params.id})
    .then(user => {
        return res.status(200).json({
            status: "success",
            data: [user.logs],
            message: "Get ok "
        });
    }).catch((err) => {
        return res.status(400).json({
            status: "failed",
            message: "Erreur lors de la récupération des informations pour l'historique de l'utilisateur: " + err,
        });
    });
}


export async function addLog(id, log_content){
    // get required variables from request body, using es6 object destructing
    // const {workout_date, workout_time, workout_duration, club_id} = reqBody;
    let newLog = {
        "workout_date": log_content.workout_date,
        "workout_time" : log_content.workout_time,
        "workout_duration": log_content.workout_duration,
        "room_id": log_content.room_id,
    }
    // user.logs.push(newLog)
    users.findOne({_id:id}).then(async function(user) {
        console.log(user)
        user.logs.push(newLog);
        // console.log("logs : "+tmp_logs)
        await users.updateOne({_id:id},{logs:user.logs})
    });
    // users.findOne({_id: id})
    // .then(user => {
        
        
    // }).catch((err) => {
    //     return "err : "+err
    //     // return res.status(400).json({
    //     //     status: "failed",
    //     //     message: "error" + err
    //     // });
    // });

}

/**
 * @route GET v1/user/getProfile/
 * @desc get informations about user
 * @access Public
 */
export async function getProfile(req, res){

    // users.findOne({_id: req.params.id})
    // .then(user => {
    let user = req.user;
        return res.status(200).json({
            status: "success",
            data: [user],
            message: "Get ok "
        });
    // }).catch((err) => {
    //     return res.status(400).json({
    //         status: "failed",
    //         message: "Erreur lors de la récupération des informations de l'utilisateur: " + err,
    //     });
    // });
}


/**
 * @route post v1/user/addUserActivity/:idActivity
 * @desc add activity to user and increment activity and room
 * @access Public
 */
export async function addUserActivity(req, res){
    
    // users.findOne({_id: req.params.idUser})
    // .then(user => {
        let user = req.user;
        const {activity_id,workout_date, workout_time, workout_duration, room_id} = req.body;
        let log_content = {workout_date, workout_time, workout_duration, room_id}
        // console.log(activity_id) 
        activities.findOne({_id: activity_id})
        .then(activity => {
            // console.log(user._id,req.body)
            addLog(user._id, log_content);
            incrementActivity(activity._id);
            incrementRoom(activity.room_id);

            return res.status(200).json({
                status: "success",
                message: "Get ok "
            });
        }).catch((err) => {
            return res.status(400).json({
                status: "failed",
                message: "Erreur lors de la récupération des informations de l'activité: " + err,
            });
        });
    // }).catch((err) => {
    //     return res.status(400).json({
    //         status: "failed",
    //         message: "Erreur lors de la récupération des informations de l'utilisateur: " + err,
    //     });
    // });
}

