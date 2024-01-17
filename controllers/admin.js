import clubs from "../models/Clubs.js";
import rooms from "../models/Room.js";
import users from "../models/User.js";

// import { getAllClubs } from "./clubs.js";


export async function getDashboard(req,res){
    let dashboard_data = {
        "stats":[],
        "clubs":[], // ajouter les rooms dans le tableau
        "activities":[]
    }

    let allClubs = await clubs.find({});
    let tmp_clubs = []
    
    allClubs.forEach(club => {
        // let tmp = club
        rooms.find({_id:club._id}).then((rms) => {
            let tmp = club._doc
            tmp_clubs.push({...tmp, "rooms":rms})
            console.log(tmp_clubs)
        })
        
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