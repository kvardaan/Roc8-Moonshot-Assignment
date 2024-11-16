import { Router } from "express"

import { authRoutes } from "./auth.route"
import { userRoutes } from "./user.route"
import { dataRoutes } from "./data.route"

const router = Router()

router.use("/auth", authRoutes)
router.use("/user", userRoutes)
router.use("/data", dataRoutes)

export { router as rootRouter }
