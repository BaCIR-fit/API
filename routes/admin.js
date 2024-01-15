import express from "express";
// import { Register,Login } from "../controllers/auth.js";
import Validate from "../middleware/validate.js";
import { check } from "express-validator";

const adminRouter = express.Router();

// manage user
adminRouter.post("/editUser", async function(req, res){
    try{
        // modifie les informations du client, sauf le mot de passe
        data = await user.find({ id: req.session.passport.user})
        user.update({id:data.id},{first_name:req.body.first_name, last_name:req.body.last_name, 
        email:req.body.email, gender:req.body.gender, birth_date:req.body.birth_date},
        (err,user)=>{
            return res.status(400).json({
                status: "failed",
                data: [user],
                message: "Erreur lors de la modification des informations" 
                + err,
            });
        });   
    }
    catch{
        return res.status(400).json({
            status: "failed",
            data: ["error "],
            message: "Erreur lors de la modification des informations" 
            // + err,
        });
    }
   
})


adminRouter.get("/getAllUsers/:limit",function(req,res){
    // récupère tous les utilisateurs
    data = user.find({},(err,users)=>{
        return res.status(400).json({
            status: "failed",
            data: [users],
            message: "Erreur lors de la récupération des utilisateurs" 
            + err,
        });
    }).limit(req.params.limit);
    res.json(data);
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



export default adminRouter;