import { Router } from "express";
import * as pc from "./products.controller.js";
const router = Router();

router.post("/",pc.addProduct)
router.get("/",pc.categoryRevenue)
router.get("/productQuantitySold",pc.productQuantitySold)

export default router