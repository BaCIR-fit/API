import express from "express";
import { Verify,VerifyRole } from "../middleware/verify.js";
import users from "../models/User.js";


const adminRouter = express.Router();


// default admin page
adminRouter.get("/",Verify,VerifyRole, (req,res) => {
    try {
        res.status(200).json({
            status: "success",
            message: "Welcome to our admin API!",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error : "+err,
        });
    }
});

// fetch all user data given a limit 
adminRouter.get("/getAllUsers/:limit",async function(req,res){
    // récupère tous les users
    users.find({}).limit(req.params.limit).then((data) => {
        console.log("data : ",data)
        return res.status(200).json({
            status: "Success",
            data: data,
            message: "All users" 
        })
    }).catch((err) => {
        console.log(err)
        return res.status(400).json({
            status: "failed",
            message: "Erreur lors de la récupération des users " 
            + err,
        })
    })
});

// fetch all dashboard information
adminRouter.get("/getDashboard",Verify,VerifyRole,function(req,res){
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
})

// manage activities

// Activity route -- POST request
// adminRouter.post(
//     "/addActivity",
    
//     Validate,
//     AddActivity
// );



export default adminRouter;