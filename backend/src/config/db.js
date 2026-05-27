import mongoose from "mongoose"

/**
 * Connects to the MongoDB server
 */
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.error("Error connecting to MongoDB", error)
        console.log("Exiting with failure")
        process.exit(1)
    }
}