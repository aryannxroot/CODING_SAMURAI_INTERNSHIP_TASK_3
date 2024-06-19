import mongoose from "mongoose";

const Connection = async (username,password) => {
    const URL = `mongodb+srv://${username}:${password}@blog-app.drb5vgs.mongodb.net/?retryWrites=true&w=majority&appName=blog-app`;

    try{
        await mongoose.connect(URL);
        console.log('Database Connected Successfully');
    } catch(error) {
        console.log('Error while connecting with the database : ', error);
    }
}

export default Connection;