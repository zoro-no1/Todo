import { create } from "zustand";
import { axiosIn } from "../util/axios";
import toast from "react-hot-toast";

// Zustand store for managing todos
const todoStore = create((set, get) => ({
  todos: [], // State to store the list of todos

  // Fetch all todos from the server
  getTodo: async () => {
    try {
      const res = await axiosIn.get("/todo/get");
      set({ todos: res.data.data }); // Update the state with fetched todos
    } catch (error) {
      console.log(error); // Log any errors
    }
  },

  // Create a new todo
  createTodo: async (value) => {
    try {
      const res = await axiosIn.post("/todo/create", value);
      toast.success("Todo Created"); // Show success notification
    } catch (error) {
      console.log(error); // Log any errors
      toast.error("Something went wrong"); // Show error notification
    }
  },

  // Delete a todo by ID
  deleteTodo: async (id) => {
    try {
      await axiosIn.delete(`/todo/delete/${id}`);
      toast.success("Deleted"); // Show success notification
    } catch (error) {
      console.log(error); // Log any errors
      toast.error("Something went wrong"); // Show error notification
    }
  },

  // Filter todos based on criteria
  filterTodo: async (filter, active) => {
    console.log(filter,active);
    
    try {
      let res;
      if (!active) {
        // Fetch todos based on filter only
        res = await axiosIn.get(`/todo/filter?${filter}`);
        set({ todos: res.data.data }); // Update the state with filtered todos
      } else {
        // Fetch todos based on filter and active status
        res = await axiosIn.get(`/todo/filter?${filter}&${active}`);
        set({ todos: res.data.data }); // Update the state with filtered todos
      }
    } catch (error) {
      console.log(error); // Log any errors
      toast.error("Something went wrong"); // Show error notification
    }
  },

  // Update a todo by ID
  updateTodo: async (id, value) => {
    try {
      await axiosIn.put(`/todo/update/${id}`, { value });
      toast.success(value); // Show success notification with updated value
    } catch (error) {
      console.log(error); // Log any errors
      toast.error(error.response.data.error); // Show error notification
    }
  },
}));

export default todoStore;
