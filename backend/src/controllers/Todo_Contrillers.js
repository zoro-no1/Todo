import { date } from "zod";
import Todo from "../models/todoModel.js";


export const  create= async (req,res)=>{
    const {title,description,priority}=req.body
    if(!title||!description||!priority){
        return res.status(400).
        json({ error: "All fields are required." });
    }
    try {
        const todo= await Todo.create({
            title,
            description,
            status:"Incomplete",
            priority,
            owner:req.user
        })

        if(!todo){
            return res.status(500).json({ error: "Failed to create todo." });
        }
        res.status(201).json({
            message:todo
        })
    } catch (error) {
        console.error(error); // Logs the error for debugging purposes
        return res.status(500).json({ error: "An unexpected error occurred." });
    
    }

}
export const get=async (req,res)=>{
    try {
        const getAllTodo=await Todo.find({owner:req.user._id})
        if(!getAllTodo){
            return res.status(500).json({ error: "Failed to find a todo." });
        }
        res.status(200).json({
            data:getAllTodo
        })

    } catch (error) {
        console.error(error); // Logs the error for debugging purposes
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
}
export const update=async (req,res)=>{
    const {id}=req.params
    const {value}=req.body
    if(!id||!value){
        return res.status(400).
        json({ error: "Id and value are required." });
    }

    try {
        const updateTodo= await Todo.findOneAndUpdate({_id:id},{ status:value},{new:true})
        
        if (!updateTodo) {
            return res.status(404).json({ error: "Todo not found or failed to update." });
        }
        return res.status(200).json({
            date:updateTodo
        })
    } catch (error) {
        console.error(error); // Logs the error for debugging purposes
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
}
export const deleteTodo =async (req,res)=>{
        const {id}=req.params
        const myId=req.user._id
        if(!id){
            return res.status(400).
            json({ error: "Id are required." });
        }
        try {
            const deleteTask=await Todo.findOneAndDelete({_id:id,owner:myId},{new:true})
            if (!deleteTask) {
                return res.status(404).json({ error: "Todo not found or failed to delete." });
            }
            return res.status(200).json({
                date:deleteTask
            })
        } catch (error) {
            console.error(error); // Logs the error for debugging purposes
            return res.status(500).json({ error: "An unexpected error occurred." });
        }
}
export const filter=async(req,res)=>{
    const {status}=req.query
    console.log(status);
    if(!req.query){
        return res.status(400).
        json({ error: "filter parameter not avilable." });
    }
    try {
        const filterTodos=await Todo.find({$and:[{owner:req.user._id},req.query]})
        if(!filterTodos){
            return res.status(404).json({ error: "Todo not found ." });
        }
        
        
        return res.status(200).json({
            date:filterTodos
        })

    } catch (error) {
        console.error(error); // Logs the error for debugging purposes
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
    
}