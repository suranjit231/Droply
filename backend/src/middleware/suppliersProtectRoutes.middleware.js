import jwt from "jsonwebtoken";
import { AppError } from "./errorHandler.middleware.js";


const suppliersProtectorMiddleware = async (req, res, next)=>{
   
    try{
        const {jwtToken} = req.cookies;
        console.log("jwtToken: ", jwtToken);
        if(!jwtToken){
            throw new AppError("Unauthorized! credential is missing!", 404)
        }

        jwt.verify(jwtToken, process.env.JWT_SECRET, async (err, data)=>{

            if(err){
                throw new AppError("Invalid credential.", 401);

            }else{
                console.log("data.after decoded: ", data);

                 if(data.userType !=="suppliers"){
                    throw new AppError("Unauthorized you can't access this route.", 401);

                 }

                    req.userId = data.userId;
                    // console.log("tesing admin protect route: ", data.userId);
                    next();
                
            }
        })

    }catch(error){
        next(error);
    }
}


export default suppliersProtectorMiddleware;