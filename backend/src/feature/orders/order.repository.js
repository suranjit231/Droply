import orderModel from "./orderSchema.js";
import userModel from "../users/userSchema.js";
import inventoryModel from "../inventories/inventorySchema.js";
import { AppError } from "../../middleware/errorHandler.middleware.js";
//import calculateOptimalRoute from "../../config/testRoutesForFrontend.js";
import calculateOptimalRoute from "../../utility/calculateOptimizedRoutes.js";


export default class OrderRepository{

    //======== placed order by users ==========//
    async placedOrder(userId, quantity ){
        try{
            const user = await userModel.findOne({_id:userId});

            //====== if not user throw error ========//
            if(!user){
                throw new AppError("please login to plced order", 404);
            }

            //===== create a new order ===============//
            const newOrder = new orderModel({
                user:userId,
                quantity:Number(quantity),
                timeOfRegistration:new Date(),
                orderStatus:"pending"
            });

            const savedOrder = await newOrder.save();

             user.orders.push(savedOrder._id);

             await user.save();

            return {success:true, message:"Your order placed sucessfully"};

        }catch(error){
            console.log("error in placed order repo: ", error);
            throw error;
        }
    }


    //============ mark as delivered by delivery boy =====================//
    async markAsDelivered(orderId ){
        try{

            const order = await orderModel.findOne({_id:orderId});

            if(!order){
                throw new AppError("order not found!", 404);
            }

            order.status = "delivered";

            const savedOrder = await order.save();
            return {success:true, message:"order status updated!", order:savedOrder};


        }catch(error){
            next(error);
        }
    }



    //============= calculete most optimized routes =================//
   async calculateSortestRoutes(vehicalLimit, currentLocation ) {
        try {
            // Fetch pending orders and populate user data to get user locations
            const orders = await orderModel.find({ orderStatus: "pending" }).populate("user");
            const deliveryLocations = orders
                .map(order => ({
                    coordinates: order.user.coordinates,
                    quantity: order.quantity,
                    contact: {
                        name: order.user.name,
                        phone: order.user.contact
                    }
                }))
                .filter(coords => coords.coordinates?.latitude && coords.coordinates?.longitude);
    
            const parcelCapacity = vehicalLimit || 150; // --- needs to modify based on capacity ---//
            const myInfo = orders.find(order => order.user.email === "namasudrasuranjit164@gmail.com");
            const startingLocation = currentLocation || { latitude: 27.4656118, longitude: 94.9022926 };
    
            // Fetch inventory locations
            const inventories = await inventoryModel.find({}).limit(2);
            const stockLocations = inventories
                .map(inv => inv.coordinates)
                .filter(coords => coords?.latitude && coords?.longitude);

                //console.log("stock location: ", stockLocations);
    
            // Calculate optimal delivery and refill routes
            const finalResult = await calculateOptimalRoute({
                deliveryLocations,
                stockLocations,
                parcelCapacity,
                startingLocation
            });
    
           // console.log("Final result: ", finalResult);
            return ({ success: true, message: "Final routes calculated successfully!", data: finalResult })
        } catch (error) {
            console.error("Error calculating optimized delivery routes:", error);
            return res.status(500).json({ success: false, message: "Error calculating routes", error: error.message });
        }
    }




}