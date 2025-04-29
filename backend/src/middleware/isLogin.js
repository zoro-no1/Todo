import jwt from "jsonwebtoken"
import User from "../models/userModel.js";

export const isLogin=async(req,res,next)=>{

    const token=req.cookies.token;
    
    try {
        if(!token){
           return res.status(403).json({
                message:"No Token"
            })
        }
        const tokenUser=jwt.verify(token,process.env.JWT_TOKEN)
        if(!tokenUser){
            res.status(403).json({
                message:"Invalide"
            })
        }
        
        const user=await User.findOne({_id:tokenUser.id}).select("-password")
        if(!user){
            res.status(403).json({
                message:"Not Found"
            })
        }
        
        req.user=user
        next()

    } catch (error) {
        console.log(error);
        res.status(401).clearCookie("token").json({message:"islogin error"})
    }

}