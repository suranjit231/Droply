import OrderRepository from "./order.repository.js";

import { AppError } from "../../middleware/errorHandler.middleware.js";


export default class OrderController{
    constructor(){
        this.orderRepository = new OrderRepository();
    }


    //======= placed order =============//
    async placedOrder(req, res, next){
        try{
            const userId = req.userId;
            const quantity = req.body.quantity;

            if(quantity < 1){
                throw new AppError("quantity must be a minimum 1", 401);
            }

            const result = await this.orderRepository.placedOrder(userId, quantity);

            if(result?.success){
                return res.status(201).json(result);
            }


        }catch(error){
            console.log("error in placed order controller: ", error);
            next(error);
        }
    }


    //======== get all pending order list with sortest routes by delivery boy =========//
    async getSortestRoutesForAllOrders(req, res, next){

        try{

            const { vehicalLimit, currentLocation } = req.query;

            const orders = await this.orderRepository.calculateSortestRoutes(vehicalLimit, currentLocation);
            
            if(orders){
                return res.status(200).json(orders);
            }

        }catch(error){
            next(error);
        }

    }



    //========== mark as delivered success fully ===========//
    async markAsDelivered(req, res, next){
        try{

            const { orderId } = req.params;

            if(!orderId){
                throw new AppError("orderId is required", 401);
            }

            const result = await this.orderRepository.markAsDelivered(orderId);
            if(result){
                return res.status(200).json(result);
            }


        }catch(error){
            next(error);
        }
    }
}