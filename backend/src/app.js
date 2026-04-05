import express from "express"
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"
import errorHandler from "./middleware/error.middleware.js"

const app = express();

const origins = [
    "http://localhost:5173"
];

app.use(cors({
    origin: origins
}));

app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.use(errorHandler)

export default app