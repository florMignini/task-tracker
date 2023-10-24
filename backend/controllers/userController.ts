import { Request, Response } from "express";
//model import
import User from "../models/User.ts";
import { confirmationToken, generateJWT } from "../helpers/index.ts";



const register = async(req: Request, res: Response) => {
    //aviod duplicated register user
    const { email } = req.body;
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
        const error = new Error(`User ${email} already exists`)
        return res.status(400).json({
            msg: error.message,
        });
    }
    
try {
    //new user creation
    const newUser = new User(req.body)
    newUser.token = confirmationToken();
    const newUserCreated = await newUser.save();

   return res.json(newUserCreated).status(201)
} catch (error) {
    console.log(error);
}
}

const login = async(req: Request, res: Response)=>{
const {email, password} = req.body;
//confirm if user exist
const userExist = await User.findOne({email});
if(!userExist) {
const error = new Error(`User with email: ${email} is not registered`);
res.status(403).json({message: error.message});
}

//confirm if user is confirmed
if(!userExist.confirm){
    const error = new Error(`User with email: ${email} is not confirmed`);
    res.status(403).json({message: error.message});
}

//compare password
if(await userExist.comparePassword(password)){
    res.json({
    _id: userExist._id,
    name: userExist.name,
    email: userExist.email,
    token: generateJWT(userExist._id)
})
}else{
    const error = new Error(`Wrong password`);
    res.status(403).json({message: error.message});
}
}

export {
    register,
    login
}