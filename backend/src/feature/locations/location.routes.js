import express from "express";
import LocationController from "./location.controller.js";


const locationRoutes = express.Router();
const locationController = new LocationController();


//======= routes for checking is a locations is exist or not in our service area ==========//
locationRoutes.get("/checkExist", (req, res, next)=>{
    locationController.isLocationExist(req, res, next);
});

//======= inserting new locations polygon ==========//
locationRoutes.post("/createPolygon", (req, res, next)=>{
    locationController.createNewPolygon(req, res, next);
})


export default locationRoutes;