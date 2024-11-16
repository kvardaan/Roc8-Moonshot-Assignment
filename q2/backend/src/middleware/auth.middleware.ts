import { StatusCodes } from "http-status-codes"
import { verify, JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

import { config } from "../utils/config/env"
import prisma from "../utils/config/prismaClient"

export interface AuthRequest extends Request {
  id?: string
}

export const authMiddleware = (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    response.status(StatusCodes.UNAUTHORIZED).json({ error: "Not Authorized" })
    return
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = verify(token, config.jwtSecret) as JwtPayload
    console.log(typeof decoded.id)
    if (typeof decoded.id !== "string") {
      response.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid token" })
      return
    }

    request.id = decoded.id
    next()
  } catch (error: Error | any) {
    if (error.name === "TokenExpiredError") {
      response.status(StatusCodes.UNAUTHORIZED).json({ error: "Token expired" })
      return
    } else if (error.name === "JsonWebTokenError") {
      response.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid token" })
      return
    } else {
      response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: JSON.stringify(error.message) })
      return
    }
  }
}

export const doesUserExists = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email } = request.body
  console.log({ email })

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (!existingUser) {
      response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "User doesnot exist!" })
      return
    }

    next()
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong!" })
    return
  }
}
