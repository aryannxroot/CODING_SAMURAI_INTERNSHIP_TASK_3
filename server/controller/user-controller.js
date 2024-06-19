import User from "../model/user.js";


export const signUpUser = async (request, response) => {

    try{

        const user = request.body;

        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({message : "Sign Up Successfully"});

    } catch(error) {
        return response.status(500).json({message : 'Internal Server Error'});

    }

}