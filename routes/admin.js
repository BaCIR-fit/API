import express from "express";
import { Register,Login } from "../controllers/auth.js";
import Validate from "../middleware/validate.js";
import { check } from "express-validator";
import users from "../models/User.js";
// import utilisateurs from "../models/User2.js"
import activities from "../models/Activity.js";

import bodyParser from 'body-parser'
const adminRouter = express.Router();

// // manage user
// adminRouter.post("/editUser", async function(req, res){
//     try{
//         // modifie les informations du client, sauf le mot de passe
//         data = await users.find({ id: req.session.passport.user})
//         users.update({id:data.id},{first_name:req.body.first_name, last_name:req.body.last_name, 
//         email:req.body.email, gender:req.body.gender, birth_date:req.body.birth_date},
//         (err,user)=>{
//             return res.status(400).json({
//                 status: "failed",
//                 data: [user],
//                 message: "Erreur lors de la modification des informations" 
//                 + err,
//             });
//         });   
//     }
//     catch{
//         return res.status(400).json({
//             status: "failed",
//             data: ["error "],
//             message: "Erreur lors de la modification des informations" 
//             // + err,
//         });
//     }
   
// })


adminRouter.get("/getAllUsers/:limit",async function(req,res){
    // récupère tous les utilisateurs
    try{
        // let act = new activities();
        // activities.create(act).then((res) => {
            console.log("here")
            activities.find({}).then((data) => {
                console.log("data : ",data)
                return res.status(200).json({
                    status: "Success",
                    data: [data],
                    message: "All users" 
                })
            }).catch((err) => {
                console.log(err)
            })
        // })
        
    } catch (err) {
        return res.status(400).json({
            status: "failed",
            // data: [data],
            message: "Erreur lors de la récupération des utilisateurs" 
            + err,
        })    

    }
    // let collection = await db.collection("activities");
    // let results = await collection.find({}) 
    // .limit(50)
    // .toArray();
    // res.json(results).status(200);
    // res.json(data);
    });

// dashboard
adminRouter.get("/getDashboard",function(req,res){
    //STATS
    // stats daily/monthly/yearly
    
    // SALLES
    // nb de sportifs/salle/club en tps réel 
    // like {club1:{salle1:{nbuser:0}}}
    // FIN SALLES

    // PLANNING
    //récup les plannings à x horizon de temps
    // PLANING
})



// Activity route -- POST request
// adminRouter.post(
//     "/addActivity",
    
//     Validate,
//     AddActivity
// );



export default adminRouter;