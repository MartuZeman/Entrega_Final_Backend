import mongoose from "mongoose";



const connectMongoDB = async()=>{
    try {
        await mongoose.connect(process.env.URI_MONGODB);
        console.log("conectado con mongoDB")
    } catch (error) {
        console.log("error al conectar mongoDB")
    }
};

export default connectMongoDB