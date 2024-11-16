import { config as conf } from "dotenv"

conf()

const _config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  feRoute: process.env.FE_ROUTE || "http://localhost:5173",
  jwtSecret: process.env.JWT_SECRET || "secret",
}

export const config = Object.freeze(_config)
