import cors from "cors"
import express from "express"

import { rootRouter } from "./routes/index"
import { config } from "./utils/config/env"
import loggingMiddlware from "./middleware/logging.middleware"

const app = express()

app.use(
  cors({
    origin: config.feRoute,
    methods: ["GET", "POST"],
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(loggingMiddlware)

app.use("/api/v1", rootRouter)

export default app
