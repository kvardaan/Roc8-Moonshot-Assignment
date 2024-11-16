import { Router } from "express"

import { authRoutes } from "./auth.route"
import { userRoutes } from "./user.route"

const router = Router()

router.use("/auth", authRoutes)
router.use("/user", userRoutes)

export { router as rootRouter }