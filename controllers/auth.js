import bcrypt from "bcrypt";
import users from "../models/User.js";
import Blacklist from '../models/Blacklist.js';
import qrcodeModel from "../models/QrCode.js";
// REGISTER, EDIT, LOGIN & LOGOUT FUNCTIONS


/**
 * @route POST v1/auth/register
 * @desc Registers a user
 * @access Public
 */
export async function Register(req, res) {
    // get required variables from request body, using es6 object destructing
    const { first_name, last_name, birth_date, gender, email, password} = req.body;
    try {
        // create an instance of a user
        let newUser = new users({
            first_name,
            last_name,
            birth_date,
            gender,
            email,
            password,
        });
        // Check if user already exists
        const existingUser = await users.findOne({ email });
        if (existingUser)
            return res.status(400).json({
                status: "failed",
                message: "Il semble que vous ayez déjà un compte avec cette adresse e-mail.",
            });
        const savedUser = await newUser.save() // save new user into the database
        const { role, ...user_data } = savedUser._doc;
        res.status(200).json({
            status: "success",
            data: [user_data],
            message:
                "Merci de vous être inscrit. Votre compte a été créé avec succès.",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,  
            data: [],
            message: "Internal Server Error : " + err,
        });
    }
    res.end();
}


export async function editProfile(req, res) {  
    try{
        // modifie les informations du client, sauf le mot de passe
        let data = await users.find({ _id: req.session.passport.user})
        users.updateOne({_id:data.id},{first_name:req.body.first_name, last_name:req.body.last_name, 
        email:req.body.email, gender:req.body.gender, birth_date:req.body.birth_date}).then(user =>{
            return res.status(200).json({
                status: "success",
                data: user,
                message: "Modif ok" 
            }); 
    }).catch ((err) =>{
        return res.status(400).json({
            status: "failed",
            data: ["error "],
            message: "Erreur lors de la modification des informations: " + err,
        });
    });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,  
            message: "Internal Server Error : " + err,
        });
    }
}


/**
 * @route POST v1/auth/login
 * @desc logs in a user
 * @access Public
 */
export async function Login(req, res) {
    // Get variables for the login process
    const { email,password } = req.body;
    console.log(req.body)
    try {
        // Check if user exists
        const user = await users.findOne({ email }).select('+password').exec();
        if (!user) {
            return res.status(401).json({
                status: "failed",
                message:
                    "Email ou mot de passe invalide. Veuillez réessayer avec les bonnes informations de connexion.",
            });
        }
        // if user exists, validate password
        const isPasswordValid = await bcrypt.compare(
            `${password}`,
            user.password
        );
        // if not valid, return unathorized response
        if (!isPasswordValid){
            return res.status(401).json({
                status: "failed",
                message:
                    "Invalide email ou mot de passe. Veuillez réessayer avec les bonnes informations de connexion.",
            });
        }

        let options = {
            maxAge: 20 * 60 * 1000, // would expire in 20minutes
            httpOnly: true, // The cookie is only accessible by the web server
            secure: true,
            sameSite: "None",
        };

        const token = user.generateAccessJWT(); // generate session token for user
        let oldCodes = await qrcode.deleteMany({user_id:user.id})

        let qr = new qrcode({user_id:user.id,qr_value:"yes"})
        let qrsaved = await qr.save();
        res.cookie("SessionID", token, options); // set the token to response header, so that the client sends it back on each subsequent request
        res.status(200).json({
            status: "success",
            data:{token:token,qr_code:qrsaved.qr_value,user_data:JSON.stringify(user._doc)},
            message: "You have successfully logged in.",
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error : "+err,
        });
    }
    res.end();
}

/**
 * @route POST /auth/logout
 * @desc Logout user
 * @access Public
 */
export async function Logout(req, res) {
  try {
    const authHeader = req.headers['cookie']; // get the session cookie from request header
    if (!authHeader) return res.sendStatus(204); // No content
    const cookie = authHeader.split('=')[1]; // If there is, split the cookie string to get the actual jwt token
    const accessToken = cookie.split(';')[0];
    const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted
    // if true, send a no content response.
    if (checkIfBlacklisted) return res.sendStatus(204);
    // otherwise blacklist token
    const newBlacklist = new Blacklist({
      token: accessToken,
    });
    await newBlacklist.save();
    // Also clear request cookie on client
    res.setHeader('Clear-Site-Data', '"cookies"');
    res.status(200).json({ message: 'You are logged out!' });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
  res.end();
}



/**
 * @route POST /auth/qrVerify
 * @desc Verify user
 * @access Public
 */
export async function QRCode(req, res) {
    const qrCodeUser = req.body.qrCode.toString();

    console.log(qrCodeUser);

    try {
        const qrCode = await qrcodeModel.findOne({ qr_value: qrCodeUser });

        console.log(qrCode);

        if (qrCode) {
            const user = await users.findById(qrCode.user_id);
            console.log(user);
            if (user) {
                res.status(200).json({ userId: user._id });
            } else {
                res.status(200).json({ userId: 0 });
            }
        } else {
            res.status(200).json({ userId: 0 });
        }
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
}
