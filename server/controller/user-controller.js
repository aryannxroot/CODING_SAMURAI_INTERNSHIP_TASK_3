import User from "../model/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Token from "../model/token.js";

dotenv.config();

export const signUpUser = async (request, response) => {

    try{

        const hashedPassword = await bcryptjs.hash(request.body.password, 10);
        
        const user = {name : request.body.name , username : request.body.username, password : hashedPassword};

        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({message : "Sign Up Successfully"});

    } catch(error) {
        return response.status(500).json({message : 'Error while signing up user.'});

    }

}

export const loginUser = async (request, response) => {

    let user = await User.findOne({ username : request.body.username  });
    if (!user) {
        return response.status(400).json({msg : 'username doesnot match'});
    }

    try{

        let match = await bcryptjs.compare(request.body.password,user.password);
        if(match) {

            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn : '15m'});
            const refreshToken =jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY); 
 
            const newToken = new Token({token : refreshToken});
            await newToken.save();

            return response.status(200).json({ accessToken : accessToken , refreshToken : refreshToken, name : user.name, username : user.username });

        } else {
            return response.status(400).json({ msg : ' Password doesnot match '});
        }


    } catch( error) {
        return response.status(500).json({ msg : 'Error while logging in user.'});
    }
}