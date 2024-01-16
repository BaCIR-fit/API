import express from "express";
// import { Register,Login } from "../controllers/auth.js";
import Validate from "../middleware/validate.js";

const roomRouter = express.Router();

roomRouter.get("/getAllRoom/:limit",function(req,res){
    // récupère toutes les salles
    data = salle.find({},(err,salles)=>{
        return res.status(400).json({
            status: "failed",
            data: [salles],
            message: "Erreur lors de la récupération des utilisateurs" 
            + err,
        });
    }).limit(req.params.limit);
    return res.json(data);
});

export default roomRouter;