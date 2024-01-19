import users from '../models/User.js';
import { decrementRoom, incrementRoom } from "../controllers/room.js";
import { decrementActivity, incrementActivity } from "../controllers/activity.js"
import activities from "../models/Activity.js";
import rooms from '../models/Room.js';
import Clubs from '../models/Clubs.js';
/**
 * @route GET v1/user/getLogs/:id/
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
    let newLog = {
        "activity_id": log_content.activity_id,
        "workout_date": log_content.workout_date,
        "workout_time" : log_content.workout_time,
        "workout_duration": log_content.workout_duration,
        "room_id": log_content.room_id,
        "room_name":log_content.room_name,
        "club_name":log_content.club_name
    }
    users.findOne({_id:id}).then(async function(user) {
        user.logs.push(newLog);
        await users.updateOne({_id:id},{logs:user.logs})
    });
}

export async function deleteLog(id, activity){
    try {
        // Assuming id is the user's ID
        await users.updateOne(
            { _id: id },
            { $pull: { logs: { activity_id: activity } } }
        );

        return { success: true, message: 'Log deleted successfully' };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to delete log');
    }
}


/**
 * @route GET v1/user/getProfile/
 * @desc get informations about user
 * @access Public
 */
export async function getProfile(req, res){
    let user = req.user;
    return res.status(200).json({
        status: "success",
        data: [user],
        message: "Get ok "
    });
}


/**
 * @route post v1/user/addUserActivity/:idActivity
 * @desc add activity to user and increment activity and room
 * @access Public
 */
export async function addUserActivity(req, res){
    
    let user = req.user;
    const {activity_id,workout_date, workout_time, workout_duration, room_id,club_id} = req.body;
    let room_name = await rooms.findOne({_id:room_id});
    let club = await Clubs.findOne({_id:club_id});
    let club_name = club.club_name;
    let log_content = {activity_id, workout_date, workout_time, workout_duration, room_id,room_name,club_name}

    activities.findOne({_id: activity_id})
    .then(activity => {
        // check if activity is full
        if(activity.participant_max <= activity.participant_signin){
            return res.status(400).json({
                status: "failed",
                message: "L'activité est complète"
            });
        }
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
}


/**
 * @route post v1/user/deleteUserActivity/:idActivity
 * @desc delete activity to user and decrement activity and room
 * @access Public
 */
export async function deleteUserActivity(req, res){
    let user = req.user;
    const {activity_id} = req.body;

    activities.findOne({_id: activity_id})
    .then(activity => {
        deleteLog(user._id, activity_id);
        decrementActivity(activity._id);
        decrementRoom(activity.room_id);

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
}


/**
 * @route get v1/user/isActive
 * @desc set user active
 * @access Public
 */
export async function isActive(req, res){
    let user = req.user;
    user.isActive = true;
    return res.status(200).json({
        status: "success",
        data: [user.isActive],
        message: "Get ok "
    });
}


/**
 * @route get v1/user/isNotActive
 * @desc set user not active
 * @access Public
 */
export async function isNotActive(req, res){
    let user = req.user;
    user.isActive = false;
    return res.status(200).json({
        status: "success",
        data: [user.isActive],
        message: "Get ok "
    });
}


/**
 * @route get v1/user/getActivity/:idClub
 * @desc get activity of club
 * @access Public
 */
export async function getActivity(req, res){
    try {
        const { idClub } = req.params;
        const activities = await Activity.find({ club_id: idClub }).exec();

        return res.status(200).json({
            status: "success",
            data: activities,
            message: "Get ok",
        });
    } catch (err) {
        return res.status(400).json({
            status: "failed",
            message: "Erreur lors de la récupération des informations de l'activité: " + err,
        });
    }
}


/**
 * @route get v1/user/getAllActivity
 * @desc get activity of club
 * @access Public
 */
export async function getAllActivity(req, res){
    activities.find()
    .then(activities => {
        return res.status(200).json({
            status: "success",
            data: [activities],
            message: "Get ok "
        });
    }).catch((err) => {
        return res.status(400).json({
            status: "failed",
            message: "Erreur lors de la récupération des informations de l'activité: " + err,
        });
    });
}