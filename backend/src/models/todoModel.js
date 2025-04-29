import mongoose ,{ Schema,model } from "mongoose";


const todoSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Complete","Incomplete"]
    },
    priority:{
        type:String,
        enum:["Low", "Medium", "High"]  
    },
    owner:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})

const Todo=model("Todo",todoSchema)
export default Todo