import jwt  from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Incorrect Password"});
        }
        const token = jwt.sign({_id: user._id, role: user.role}, 
            process.env.JWT_KEY || "your-secret-jwt-key-here-123456789", {expiresIn: "10d"}
        );
        res.status(200).json({success: true, token, user: {_id: user._id, name: user.name, role: user.role}});
    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }

}

const verify = async (req, res) => {
    return res.status(200).json({success: true, user: req.user});
}

export {login, verify};
