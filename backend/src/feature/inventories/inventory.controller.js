import { AppError } from "../../middleware/errorHandler.middleware.js";
import InventoryRepository from "./inventory.repository.js";

export default class InventoryController{

    constructor(){
        this.inventoryRepository = new InventoryRepository();
    }

    //======= add new inventory ==========//
    async addNewInventory(req, res, next){
        try{

            const { name, textLocation, capacity, coordinates } = req.body;

            let errors = [];

            if(!name){
                errors.push("neame is required")
            }

            if(!capacity){
                errors.push("capacity is required")
            }

            if(!coordinates || !coordinates?.latitude || !coordinates?.longitude){
                errors.push("location is missing or incorrrect location");

            }

            if(errors.length >0){
                throw new AppError(errors[0], 401);
            }

            const result = await this.inventoryRepository.addInventory(name, textLocation, capacity, coordinates);

            if(result){
                return res.status(201).json(result);
            }

        }catch(error){
            next(error);
        }
    }


    //======== update inventory controller ==============//
    async editInventory(req, res, next){
        try{

            const userId = req.userId;
            const { inventoryId } = req.params;
            const updateableData = req.body;

            if(!inventoryId){
                throw new AppError("Inventory ID is missing", inventoryId);
            }

            const result = await this.inventoryRepository.editInventory(
                userId, inventoryId, updateableData);

            if(result){
                return res.status(200).json("inventory is updated")
            }

        }catch(error){
            next(error);
        }
    }


    //=========== update inventory quantity ============//
    async updateInventoryQuantity(req, res, next){
        try{

            const { inventoryId } = req.params;
            const quanity = req.body.quanity;

            if(!quanity || Number(quanity)<0){
                throw new AppError("quantity must be a positive value", 401)
            }

            const result = await this.inventoryRepository.updateInventoryQunaity(
                inventoryId, quanity
            )

            if(result){
                return res.status(200).json(result);
            }

        }catch(error){
            next(error);
        }
    }


    //======== delete inventory ==============//
    async deleteInventory(req, res, next){
        try{

            const { inventoryId } = req.params;
            if(!inventoryId){
                throw new AppError("deleteable inventory id is required", 401);
            }
            const result = await this.inventoryRepository.deleteInventory(inventoryId);

            if(result){
                return res.status(200).json(result);
            }

        }catch(error){
            next(error);
        }
    }
}