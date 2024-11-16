import { Router } from "express"

import { getSheetData } from "../controllers/data.controller"
import { authMiddleware } from "../middleware/auth.middleware"

const router = Router()

router.use(authMiddleware)
router.get("/", getSheetData)

export { router as dataRoutes }
