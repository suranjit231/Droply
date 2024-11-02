import inventoryModel from "./inventorySchema.js";
import { AppError } from "../../middleware/errorHandler.middleware.js";

export default class InventoryRepository{

    async addInventory(name, textLocation, capacity, coordinates){
        try{

            const newInventory = new inventoryModel({
                name:name,
                textLocation:textLocation,
                capacity:Number(capacity),
                coordinates:coordinates
            });

            const savedInventory = await newInventory.save();

            return {success:true, message:"new inventory is created", inventory:savedInventory};


        }catch(error){
            throw error;
        }
    }


    //====== edit inventory like (location, capacity, name) ===========//
    async editInventory(userId, inventoryId, updateableData){
        try{
            const inventory = await inventoryModel.findOne({_id:inventoryId});

            if(!inventory){
                throw new AppError("inventory not found!", 404);
            }

            for(let keys in updateableData){
                inventory[keys] = updateableData[keys];
            }

            const updatedInventory = await inventory.save();

            return {success:true, message:"inventory is updated", inventory:updatedInventory}

        }catch(error){
            throw error;
        }
    }


    //======= delete inventory =============//
    async deleteInventory(inventoryId){
        try{

            const deletedResult = await inventoryModel.deleteOne({_id:inventoryId});
            console.log("delete inventory result: ", deletedResult);

            return { success:true, message:"inventory is deleted"}


        }catch(error){
            throw error;
        }
    }


    //======== update inventory quanity =============//
    async updateInventoryQunaity(inventoryId, quantity){
        try{

            const updatedInventory = await inventoryModel.findByIdAndUpdate(
                inventoryId,
                { $set: { quantity: quantity } },
                { new: true } 
            );
    
            return {success:true, message:"inventory quanity is updated", inventory:updatedInventory};


        }catch(error){
            throw error;

        }
    }
}