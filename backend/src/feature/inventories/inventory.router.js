import express from "express";
import InventoryController from "./inventory.controller.js";


const inventoryRoutes = express.Router();
const inventoryController = new InventoryController();

//======= add new inventory ===========//
inventoryRoutes.post("/addInventory", (req, res, next)=>{
    inventoryController.addNewInventory(req, res, next);
});

//======= edit inventory ==============//
inventoryRoutes.put("/editAll/:inventoryId", (req, res, next)=>{
    inventoryController.editInventory(req, res, next);
})


//======== update inventory quantity only =========//
inventoryRoutes.put("/updateQuantity/:inventoryId", (req, res, next)=>{
    inventoryController.updateInventoryQuantity(req, res, next);
})


//======== delete inventory routes ================//
inventoryRoutes.delete("/deleteInventory", (req, res, next)=>{
    inventoryController.deleteInventory(req, res, next);
})

export default inventoryRoutes;