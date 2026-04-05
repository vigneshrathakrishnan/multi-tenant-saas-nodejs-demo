import express from "express"

import {register, login} from "../controllers/auth.controller.js"
import {authMiddleware} from "../middleware/auth.middleware.js"

import {createUser, getUsers} from "../controllers/user.controller.js"
import {createOrder, getOrders} from "../controllers/order.controller.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
// router.post("/profile", authMiddleware, profile)

// Users (tenant scoped)
router.post("/users", authMiddleware, createUser)
router.get("/users", authMiddleware, getUsers)

// Orders (tenant scoped)
router.post("/orders", authMiddleware, createOrder)
router.get("/orders", authMiddleware, getOrders)

export default router