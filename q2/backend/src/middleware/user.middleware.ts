import { StatusCodes } from "http-status-codes"
import { Request, Response, NextFunction } from "express"

import prisma from "../utils/config/prismaClient"
import { userSchema, userType } from "../types/user.type"
import { AuthRequest } from "./auth.middleware"

export const validatedUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userData: userType = request.body

  const validatedUser = userSchema.safeParse(userData)

  if (!validatedUser.success) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: validatedUser.error.issues[0].message })
    return
  }

  next()
}

export const userAlreadyExists = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userData: userType = request.body

  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  })

  if (existingUser) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Email already taken!" })
    return
  }

  next()
}

export const doesUserExistWithId = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  const id = request.id
  const existingUser = await prisma.user.findFirst({
    where: { id },
  })

  if (!existingUser) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "User doesnot exist!" })
    return
  }

  next()
}
