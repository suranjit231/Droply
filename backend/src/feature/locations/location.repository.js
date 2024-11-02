import areaModel from "./locationSchema.js";

export default class LocationRepositry{

    //========= creating service area polygon =============//
    async createAreaPolygon(){

        try{

        const exampleArea = new areaModel({
            name: 'Available sorrounding area',
            region: {
              type: 'Polygon',
              coordinates: [
                [
                  [94.91264810093418, 27.46949678632491],
                  [94.90352174093344, 27.46396102867793],
                  [94.89493882556125, 27.473361457425952],
                  [94.89926865138747, 27.482768548660566],
                  [94.9083827783003, 27.485990272074563],
                  [94.91877318807175, 27.4893751819967],
                  [94.92496238645931, 27.479910453183084], 
                  [94.92933453958648, 27.471357465279443],
                  [94.91264810093418, 27.46949678632491]
                ]
              ]
            }
          });
          
         await exampleArea.save();

        }catch(error){
            throw error;
        }
    }


    // ====== checking a points is lies inside this polygon area ============//
async isLocationInsidePolygon( point) {

    try{

        const result = await areaModel.findOne({
            region: {
                $geoIntersects: {
                $geometry: {
                  type: "Point",
                  coordinates: [Number(point.longitude), Number(point.latitude)]
                }
              }
            }
          });

          console.log("result: ", result);
        
          return result !== null; 


        }catch(error){
            console.log("finding area is prensents error: ", error)
        }


    }
    
  


}

  

  