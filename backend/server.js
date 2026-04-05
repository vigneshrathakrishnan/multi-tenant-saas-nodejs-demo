import dotenv from "dotenv"
dotenv.config()

import app from "./src/app.js"

import { connectDB } from "./config/db.js";

const PORT = process.env.PORT
const connStr = process.env.MONGO_DB

connectDB(connStr)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    // console.log(process.env.JWT_SECRET)
})