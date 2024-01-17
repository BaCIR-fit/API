import users from "../models/User.js";
import Blacklist from "../models/Blacklist.js";
import jwt from "jsonwebtoken";
import {SECRET_ACCESS_TOKEN, API_KEY} from "../config/index.js"

export async function Verify(req, res, next) {
    try {
        const authHeader = req.headers["cookie"]; // get the session cookie from request header

        if (!authHeader) return res.sendStatus(401); // if there is no cookie from request header, send an unauthorized response.
        const cookie = authHeader.split("=")[1]; // If there is, split the cookie string to get the actual jwt

        const accessToken = cookie.split(";")[0];
        const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted
        // if true, send an unathorized message, asking for a re-authentication.
        if (checkIfBlacklisted)
            return res
                .status(401)
                .json({ message: "This session has expired. Please login" });
    
        // Verify using jwt to see if token has been tampered with or if it has expired.
        // that's like checking the integrity of the cookie
        jwt.verify(cookie, SECRET_ACCESS_TOKEN, async (err, decoded) => {
            if (err) {
                // if token has been altered or has expired, return an unauthorized error
                return res
                    .status(401)
                    .json({ message: "This session has expired. Please login" });
            }

            const { id } = decoded; // get user id from the decoded token
            const user = await users.findById(id); // find user by that `id`
            const { password, ...data } = user._doc; // return user object without the password
            req.user = data; // put the data object into req.user
            next();
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error : "+err,
        });
    }
}

export function VerifyAdmin(req, res, next) {
    try {
        // console.log(req.)
        // check if user has no advance privileges
        // return an unathorized response
        const authHeader = req.header("x-api-key"); // get the session cookie from request header
        console.log(authHeader)
        if (!authHeader) return res.sendStatus(401); // if there is no cookie from request header, send an unauthorized response.
        let token = authHeader
        if (token != API_KEY ) {
            return res.status(401).json({
                status: "failed",
                message: "You are not authorized to view this page.",
            });
        }
        next(); // continue to the next middleware or function
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error : "+err,
        });
    }
}
export function VerifyRole(req, res, next) {
    try {
        console.log(req)
        const user = req.user; // we have access to the user object from the request
        // console.log("verify : "+user.isAdmin)
        const isAdmin  = user.isAdmin; // extract the user role
        // check if user has no advance privileges
        // return an unathorized response
        if (!isAdmin) {
            return res.status(401).json({
                status: "failed",
                message: "You are not authorized to view this page.",
            });
        }
        next(); // continue to the next middleware or function
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error : "+err,
        });
    }
}