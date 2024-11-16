import jwt from "jsonwebtoken"
import { compare } from "bcryptjs"
import { StatusCodes } from "http-status-codes"
import { Request, Response, NextFunction } from "express"

import { config } from "../utils/config/env"
import { authType } from "../types/auth.type"
import prisma from "../utils/config/prismaClient"

// POST /api/v1/auth/login - user login
export const login = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userData: authType = request.body
  const user = await prisma.user.findUnique({
    where: { email: userData.email },
  })

  try {
    if (user) {
      const isPasswordValid = await compare(userData.password, user.password)

      if (!isPasswordValid) {
        response
          .status(StatusCodes.UNAUTHORIZED)
          .json({ error: "Invalid credentials" })
        return
      }

      const token = jwt.sign({ id: user.id }, config.jwtSecret, {
        expiresIn: "1h",
      })

      response.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })

      response
        .status(StatusCodes.OK)
        .json({ message: "Login successful", token })
    }
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Error: ${error}` })

    return
  }
}

// POST /api/v1/auth/logout - user logout
export const logout = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.clearCookie("token")
  response.status(StatusCodes.OK).json({ message: "Logout successful" })
  return
}
