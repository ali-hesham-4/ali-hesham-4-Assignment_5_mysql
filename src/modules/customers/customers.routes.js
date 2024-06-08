import { Router } from "express";
import * as cc from "./customers.controllers.js";
const router = Router();

router.post("/",cc.signUp)
router.get("/",cc.login)


export default router