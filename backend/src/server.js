import express from "express"
import dotenv from "dotenv"

import { connectDB } from "./config/db.js"

import testRoutes from "./routes/testRoutes.js"

// set up .env config
dotenv.config()
// get port from env
const PORT = process.env.PORT || 5001
// set up express
const app = express();
// can read json sent from client
app.use(express.json())

// use use middleware cors on front end url
// app.use(cors({
//     origin: "http://localhost:5173"
// }))

app.use("/api/test", testRoutes)

// set up rate limiter
// app.use(rateLimiter)
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`)
    })
})