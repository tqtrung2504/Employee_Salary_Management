import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyUser = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if(!authHeader){
            return res.status(401).json({success: false, message: "No authorization header provided"});
        }
        const parts = authHeader.split(' ');
        if(parts.length !== 2 || parts[0] !== 'Bearer'){
            return res.status(401).json({success: false, message: "Invalid authorization format"});
        }
        const token = parts[1];
        const decoded = jwt.verify(
            token,
            process.env.JWT_KEY || "your-secret-jwt-key-here-123456789"
        );
        if(!decoded){
            return res.status(401).json({success: false, message: "Invalid token"});
        }
        const user = await User.findById({_id: decoded._id}).select("-password");
        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }
        req.user = user;
        next();
    }catch(error){
        if(error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError'){
            return res.status(401).json({success: false, message: 'Invalid or expired token'});
        }
        return res.status(500).json({success: false, message: "server error"});

    }
}

export default verifyUser;