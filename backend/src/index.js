import dotenv from"dotenv"
import express from "express";
import cookieParser from "cookie-parser"
import authUser from "./routers/authRouter.js"
import todoRoute from"./routers/totoRouters.js"
import db from "./db.js"
dotenv.config()
const app=express()
const port = process.env.PORT

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/auth",authUser);
app.use("/api/todo",todoRoute)



app.listen(port,()=>{
console.log(`Server Running On Port ${port}`);
db()
})