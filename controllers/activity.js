/**
 * @route POST v1/auth/register
 * @desc Registers a user
 * @access Public
 */
export async function AddActivity(req, res) {
    // get required variables from request body, using es6 object destructing
    const { Activity_name, Coach_name, Activity_date, Activity_time_duration, Participant_signin, State} = req.body;
    try {
        // create an instance of a user
        const newActivity = new Activities({
            Activity_name,
            Coach_name,
            Activity_date,
            Activity_time_duration,
            Participant_signin,
            State
        });
        // Check if user already exists
        const existingActivity = await Activities.findOne({ Activity_date, Activity_time_duration });
        if (existingActivity)
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "Il semble qu'il y a déja une activité à ce créneau.",
            });
        const savedActivity = await newActivity.save(); // save new user into the database
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
            message: "Internal Server Error",
        });
    }
    res.end();
}