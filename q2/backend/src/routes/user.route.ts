import { Router } from "express"

import { authMiddleware } from "../middleware/auth.middleware"
import { getUserWithId } from "../controllers/user.controller"
import { doesUserExistWithId } from "../middleware/user.middleware"

const router = Router()

router.use(authMiddleware)

router.get("/", doesUserExistWithId, getUserWithId)

export { router as userRoutes }
