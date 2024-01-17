import users from '../models/User.js';
import { incrementRoom } from "../controllers/room.js";
import { incrementActivity } from "../controllers/activity.js"
import activities from "../models/Activity.js";

/**
 * @route GET v1/user/getLog/:id/
 * @desc Get history of user
 * @access Public
 */
export async function getLog(req, res){
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


export async function addLog(id){
    // get required variables from request body, using es6 object destructing
    const {workout_date, workout_time, workout_duration, localisation} = req.body;

    users.findOne({_id: id})
    .then(user => {
        let newLog = {
            "workout_date": workout_date,
            "workout_time" : workout_time,
            "workout_duration": workout_duration,
            "localisation": localisation,
        }
        user.logs.push(newLog)
        return res.status(200).json({
            status: "success",
            message: "Get ok "
        });
    }).catch((err) => {
        return res.status(400).json({
            status: "failed",
            message: "Erreur lors de la récupération des informations pour l'utilisateur: " + err,
        });
    });
}

/**
 * @route GET v1/user/getUser/:id/
 * @desc get informations about user
 * @access Public
 */
export async function getUser(req, res){
    users.findOne({_id: req.params.id})
    .then(user => {
        return res.status(200).json({
            status: "success",
            data: [user],
            message: "Get ok "
        });
    }).catch((err) => {
        return res.status(400).json({
            status: "failed",
            message: "Erreur lors de la récupération des informations de l'utilisateur: " + err,
        });
    });
}


/**
 * @route get v1/user/addUserActivity/:id1/:id2/
 * @desc add activity to user and increment activity and room
 * @access Public
 */
export async function addUserActivity(req, res){
    users.findOne({_id: req.params.id1})
    .then(user => {
        activities.findOne({_id: req.params.id2})
        .then(activity => {
            addLog(user._id);
            incrementActivity(activity._id);
            incrementRoom(activity.room);

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
    }).catch((err) => {
        return res.status(400).json({
            status: "failed",
            message: "Erreur lors de la récupération des informations de l'utilisateur: " + err,
        });
    });
}

