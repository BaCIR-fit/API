import clubs from "../models/Clubs.js";
import rooms from "../models/Room.js";
import users from "../models/User.js";
import activities from "../models/Activity.js";

// import { getAllClubs } from "./clubs.js";


export async function getDashboard(req,res){
    let allClubs = await clubs.find({});
    let allRooms = await rooms.find({});
    let allActivities = await activities.find({})
    // link les activités aux rooms
    let tmpRooms = allRooms;
    allRooms = tmpRooms.map(function(x) { 
        let a = allActivities.filter((el) => el.room_id == x._id)
        console.log("act: "+a+" fin act")
        x.activities = a
        return x
    })

    // link les rooms aux clubs
    let tmpClubs = allClubs;
    allClubs = tmpClubs.map(function(x) { 
        let r = allRooms.filter((el) => el.club_id == x._id)
        console.log("rooms: "+r+" fin rooms")
        x.rooms = r
        return x
    })
    
    console.log(allClubs)

    let dashboard_data = {
        "stats":[],
        "clubs":allClubs, // ajouter les rooms dans le tableau
    }

    return res.status(200).json({
        status: "ok",
        data:dashboard_data,
    })

    //STATS
    // stats daily/monthly/yearly
    
    //get tte les activités
    
    // SALLES
    // nb de sportifs/salle/club en tps réel 
    // like {club1:{salle1:{nbuser:0}}}
    // FIN SALLES

    // PLANNING
    //récup les plannings à x horizon de temps
    // PLANING
    //#swagger.tags = ['admin/']

}