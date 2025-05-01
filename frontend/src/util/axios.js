import axios from "axios"

export const axiosIn=axios.create({
    baseURL:import.meta.env.MODE === "development" ? "http://localhost:4000/api" : "/api",
    withCredentials:true
})