import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in the environment variables...")
}

export const connectToDb = async ()=>{
    const connectionState = mongoose.connection.readyState;

    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (connectionState >= 1) {
        return;
    }
    try {
        await mongoose.connect(MONGO_URI,{
            dbName: "BlogAppDb",
            bufferCommands: false,
            useNewUrlParser: true, // Optional but recommended for better error handling
            useUnifiedTopology: true, // Optional but recommended for better error handling
        })
    } catch (error) {
        throw new Error("Failed To Connect To Database...")
    }
}