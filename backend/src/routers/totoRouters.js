import { Router } from "express";
import { isLogin } from "../middleware/isLogin.js";
import { create, deleteTodo, filter, get, update } from "../controllers/Todo_Contrillers.js";

const router=Router()

router.post("/create",isLogin,create)
router.get("/get",isLogin,get)
router.put("/update/:id",isLogin,update)
router.delete("/delete/:id",isLogin,deleteTodo)
router.get("/filter",isLogin,filter)

export default router