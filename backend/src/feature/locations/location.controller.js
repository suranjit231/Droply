
import LocationRepositry from "./location.repository.js";

export default class LocationController{
    constructor(){
        this.locationRepository = new LocationRepositry();
    }


    //====== check is locations exist or not for the services =============//
    async isLocationExist(req, res, next){
        try{

            const { longitude,latitude } = req.query;

            const result = await this.locationRepository.isLocationInsidePolygon({ longitude,latitude } );
            return res.status(200).json(result);


        }catch(error){
            console.log("error: ", error)
            next(error);
        }
    }


    //======= create new poligon controller ===========//
    async createNewPolygon(req, res, next){

        try{
            const result = await this.locationRepository.createAreaPolygon();

            return res.status(201).json(result);

        }catch(error){
            next(error);
        }
    }

    
}