import express from "express";
import { Verify,VerifyAdmin,VerifyRole } from "../middleware/verify.js";
import users from "../models/User.js";
import activityRoute from "./activity.js";
import clubRouter from "./club.js";
import roomRouter from "./room.js";
import { getDashboard } from "../controllers/admin.js";

const adminApp = express();

adminApp.use('/activity', activityRoute);
adminApp.use("/clubs",clubRouter);
adminApp.use("/rooms",roomRouter);


// default admin page
adminApp.get("/",VerifyAdmin, (req,res) => {
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
    //#swagger.tags = ['Admin/']
});



adminApp.get("/getAllUsers/:limit",VerifyAdmin,async function(req,res){
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
            message: "Erreur lors de la récupération des users " + err,
        })
    })
    //#swagger.tags = ['Admin/']
});

adminApp.get("/getDashboard" ,VerifyAdmin ,getDashboard,
    //#swagger.tags = ['Admin/']
    );

// manage activities

// Activity route -- POST request
// adminRouter.post(
//     "/addActivity",
    
//     Validate,
//     AddActivity
// );

// /admin/*
// /admin/clubs/etc
// 
// 
export default adminApp;