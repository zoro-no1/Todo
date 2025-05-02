import { create } from "zustand";
import { axiosIn } from "../util/axios";
import toast from "react-hot-toast";

const todoStore=create((set,get)=>({
    todos:[],
   

    getTodo:async()=>{
      try {
          const res=await axiosIn.get('/todo/get')
          set({todos:res.data.data})
      } catch (error) {
        console.log(error);
        
      }
    },
    createTodo:async(value)=>{
       try {
         const res=await axiosIn.post('/todo/create',value)
         toast.success("Todo Created")
       } catch (error) {
        console.log(error);
        toast.error("somthing went wrong")
       }
    },
    deleteTodo:async(id)=>{
        try {
            const res=await axiosIn.delete(`/todo/delete/${id}`)
            
        } catch (error) {
            console.log(error);
            toast.error("somthing went wrong")
        }
    },
    filterTodo:async(filter,active)=>{
      try {
        let res
        
        if(!active){
          res= await axiosIn.get(`/todo/filter?status=${filter}`)
          set({todos:res.data.data})
          
        }else{
          res= await axiosIn.get(`/todo/filter?priority=${filter}&status=${active}`)
          set({todos:res.data.data})
          
        }
        
      } catch (error) {
        console.log(error);
        toast.error("somthing went wrong")
      }
    }

})) 
export default todoStore