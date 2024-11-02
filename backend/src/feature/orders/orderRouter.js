import express from "express";
import OrderController from "./order.controller.js";
import auth from "../../middleware/jwtAuth.middleware.js";
import suppliersProtectRoutes from "../../middleware/suppliersProtectRoutes.middleware.js"


const orderRouter = express.Router();
const orderController = new OrderController();


//======= placed new order by users routes ==========//
orderRouter.post("/placedOrder", auth, (req, res, next)=>{
    orderController.placedOrder(req, res, next);
});


//======= get most sortest routes for pending order by delivery boy ==========//
orderRouter.get("/findSortestRoutes", suppliersProtectRoutes, (req, res, next)=>{
    orderController.getSortestRoutesForAllOrders(req, res, next);
});


//====== mark order as delivered ===================//
orderRouter.put("/markDelivered/:orderId", suppliersProtectRoutes, (req, res, next)=>{
    orderController.markAsDelivered(req, res, next);
})


export default orderRouter;