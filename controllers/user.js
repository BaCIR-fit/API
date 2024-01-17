import users from '../models/User.js';
import history from '../models/Historique.js';

/**
 * @route POST v1/user/getHistory/:id/
 * @desc Get history of user
 * @access Public
 */
export async function getHistory(req, res){
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


/**
 * @route POST v1/user/createHistory/:id/
 * @desc create history of user
 * @access Public
 */
export async function createHistory(req, res){
    // get required variables from request body, using es6 object destructing
    const {workout_date, workout_time, workout_duration, localisation} = req.body;
    try {
        // create an instance of history model
        const newLog = new history({
            workout_date,
            workout_time,
            workout_duration,
            localisation,
            id_user: req.params.id
        });
        const savedLog = await newLog.save(); // save new room into the database
        const { role, ...Log_data } = savedLog._doc;
        res.status(200).json({
            status: "success",
            data: [Log_data],
            message:
                "L'historique a été créé avec succès.",
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


