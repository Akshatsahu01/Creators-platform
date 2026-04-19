import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config({path:"./server/.env"})

export default function uploadauth(req,res,next){
           const header=req.headers.Authorization ||req.headers.authorization
           const token=header.split(" ")[1];
           try{
             const decoded=jwt.verify(token,process.env.JWT_SECRET)
             req.user = { _id: decoded.userId || decoded.userId || decoded.userId, email: decoded.email };
             return next()
           }catch(error){
             res.status(401).json({message:"Kon ho bhai"})
           }

}