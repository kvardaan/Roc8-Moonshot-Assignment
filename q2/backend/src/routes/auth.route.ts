import { Router } from "express"

import { login, logout } from "../controllers/auth.controller"
import { doesUserExists } from "../middleware/auth.middleware"
import { userAlreadyExists, validatedUser } from "../middleware/user.middleware"
import { addUser } from "../controllers/user.controller"

const router = Router()

router.post("/login", doesUserExists, login)
router.post("/signup", userAlreadyExists, validatedUser, addUser)
router.post("/logout", logout)

export { router as authRoutes }
