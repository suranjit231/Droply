import dotenv from "dotenv";
dotenv.config();

import connectMongodb from "./src/config/connectMongodb.js"
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./src/middleware/errorHandler.middleware.js";
import userRouter from "./src/feature/users/user.router.js";
import orderRouter from "./src/feature/orders/orderRouter.js";
import inventoryRoutes from "./src/feature/inventories/inventory.router.js";
import locationRoutes from "./src/feature/locations/location.routes.js";
import suppliersProtectorMiddleware from "./src/middleware/suppliersProtectRoutes.middleware.js";



//======= creating server by invocking express ==========//
const app = express();

//====== used middleware for parsing req body and cookies =====//
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



//====== setup cors =======//
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,
  };

  app.use(cors(corsOptions))


//======= setup differnt routes for diddrent feature ========//
app.use("/api/users", userRouter);

app.use("/api/orders", orderRouter);

app.use("/api/inventory", suppliersProtectorMiddleware, inventoryRoutes);

app.use("/api/locations", locationRoutes);


app.get("/api/best", (req, res, next)=>{
    console.log("best routes called: ")
    calculateSortestRoutes( req, res, next);
})


//======== for the root route get request =========//
app.get("/", (req,res,next)=>{
    res.status(200).send("welcome to online package water delivery app!");

})


//======== error handler miidleware ================//
app.use(errorHandler);

const port = process.env.PORT || 3200;

app.listen(port, ()=>{
    console.log(`Server is listening on port: ${port}`);
    connectMongodb();
    
})