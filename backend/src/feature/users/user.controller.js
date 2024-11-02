
import UserRepository from "./user.repository.js";
import jwt from "jsonwebtoken";

export default class UserController{
    constructor(){
        this.userRepository = new UserRepository();
    }


    //======== signup controller ==========//
    async signup(req, res, next){
        try{

            const {name, email, password, contact, location, types} = req.body;

            const result = await this.userRepository.signup(name, email, password, contact, location, types
            )

            if(result?.success){
                return res.status(201).json(result);
            }

        }catch(error){
            next(error);
        }
    }


    //========= login controller ===========//
    async login(req, res, next){
        try{
            const { email, password } = req.body;
            console.log("req.body: ", req.body);

            const result = await this.userRepository.login(email, password);
           
            if(result?.success){
                const token=jwt.sign({
                    userId:result.user._id,
                    email:result.user.email,
                    userType:result.user.types,
                   }, process.env.JWT_SECRET, { expiresIn: '5h' });

                return res.status(200).cookie("jwtToken", token, { maxAge: 5 * 60 * 60 * 1000, httpOnly: true })
                .json({success:true, user:result.user, token});
 
            }

        }catch(error){
            console.log("error in login controller: ", error);
            next(error);
        }
    }


    async resetPassoword(req, res, next){
        try{

            const {email, password} = req.body;
            
            const result = await this.userRepository.resetPassword(email, password);

            if(result){
                return res.status(200).json(result);
            }


        }catch(error){
            next(error);
        }
    }


    //======== getOne user info =========================//
    async getOneUserInfo(req, res, next){
        try{
            const userId = req.userId;

            const user = await this.userRepository.getOneUserInfo(userId);

            if(user){
                return res.status(200).json(user);
            }

        }catch(error){
            next(error);
        }
    }




    //========== user logout controller =================//
    async logout(req, res, next){
        try {
           
            res.clearCookie('jwtToken').status(200).send({message:"User logout sucessfully!"});
        } catch (error) {
            console.log("error logout: ", error);
            next(error);
        }
    }
}