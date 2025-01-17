import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "./jwt.js";

async function login(email, password) {
    try {
       const existingUser = await User.findOne({email});
       if(!existingUser){
           throw new Error("User does not exist");
       }
         const isPasswordValid = await bcrypt.compare(password, existingUser.password);
         if(!isPasswordValid){
             throw new Error("Incorrect Password");
            }
            const token = generateToken(existingUser);
            return token;
    }catch(error){
        throw new Error("Invalid Credentials");
    }
}

export default { login };