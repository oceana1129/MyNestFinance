import mongoose from "mongoose"

/**
 * Creates a test schema for MongoDb
 */
const testSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    }, 
    content: {
        type: String,
        required: true,
    }
}, 
// by default will add createAt and updatedAt fields
{timestamps: true})

// test model created from Test schema
const Test = mongoose.model("Test", testSchema)

export default Test