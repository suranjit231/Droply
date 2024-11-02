import userModel from "./userSchema.js";
import { AppError } from "../../middleware/errorHandler.middleware.js";
import argon2 from "argon2";
import axios from "axios";


export default class UserRepository{


    //================ user signup ==============================//
    async signup(name, email, password, contact, location, types){
        try{

            console.log("location : " , location)

            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=AIzaSyDgs82c1GlN8j7ADTgQAnWUtH3oo-83i9U`
              );
         
        
             
                const { lat, lng } = response.data.results[0].geometry.location;
                const coordinates = { latitude: lat, longitude: lng }
                console.log("location to coordinate: ", coordinates);


            const hashedPassword = await argon2.hash(password);

            const newUser = new userModel({
                name:name,
                email:email,
                password:hashedPassword,
                contact:contact,
                coordinates:coordinates,
                types:types
            });

            const savedPassoword = await newUser.save();

            return { success:true, message:"signup sucessfully!"}

        }catch(error){
            console.log("error in user signup: ", error);
            throw error;

        }
    }


    //============== user login ====================//
    async login(email, password){
        try{
            const user = await userModel.findOne({email:email});
            if(!user){
                throw  new AppError("Invalid email!", 404);
            }

         
            const isValidPassword = await argon2.verify(user.password, password);
            
            if(!isValidPassword){
                throw new AppError("Invalid credentials!", 401);
            }

            return { success:true, message:"Login sucessfully!", user:this.removedPassword(user)}


        }catch(error){
            throw error;
        }
    }


    async resetPassword(email, password){
        try{

            const user = await userModel.findOne({email:email});
            if(!user){
                throw new AppError("No user is found with this email", 404);
            }

            const hashedPassword = await argon2.hash(password);

            user.password = hashedPassword;
            await user.save();

            return { success:true, message:"Password is reset"};


        }catch(error){
            throw error;
        }
    }


    //======= finds user information ===============//
    async getOneUserInfo(userId){
        try{
            const userInfo = await userModel.findOne({_id:userId}).populate({path:"orders"}).select("-password");
            if(!userInfo){
                throw new AppError("Unauthorized user not founds!", 404)

            }

            return { success:true, message:"user info fetch correctly", user:userInfo};


        }catch(error){
            console.log("error in get userInfo: ", error)
            throw error;

        }
    }



    //======== removed paswrd from user =============//
    removedPassword(user){
        const { password, ...withoutPassword} = user.toObject()
        return withoutPassword ;
    }


}