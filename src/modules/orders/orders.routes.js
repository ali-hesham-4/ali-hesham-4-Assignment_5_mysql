import { Router } from "express";
import * as oc from "./orders.controller.js";
const router = Router();


router.post("/",oc.addOrder)
router.get("/orderAverage",oc.orderAverage)
router.get("/customersZeroOrder",oc.customersZeroOrder)
router.get("/customerMaxItems",oc.customerMaxItems)
router.get("/customersMaxMonyPaied",oc.customersMaxMonyPaied)
router.get("/customersG5Orders",oc.customersG5Orders)
router.get("/percentageOfCustomers",oc.percentageOfCustomers)
router.get("/customerEarlistOrder",oc.customerEarlistOrder)


export default router