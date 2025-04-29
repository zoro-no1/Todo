import mongoose from "mongoose";

export default async function db(){
    const uri= process.env.DB_URI
    try {
        await mongoose.connect(uri)
        console.log("db connect");
        
    } catch (error) {
        console.log("db error");
        
    }
}