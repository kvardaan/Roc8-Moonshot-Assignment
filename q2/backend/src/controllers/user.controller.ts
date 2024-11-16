import { hash } from "bcryptjs"
import { StatusCodes } from "http-status-codes"
import { NextFunction, Request, Response } from "express"

import { userType } from "../types/user.type"
import prisma from "../utils/config/prismaClient"
import { AuthRequest } from "../middleware/auth.middleware"

// GET /api/v1/users - gets a user with ID (in token)
export const getUserWithId = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  const id = request.id

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    })
    response
      .status(StatusCodes.OK)
      .json({ id: user?.id, email: user?.email, name: user?.name })
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: `Error fetching user: ${error}`,
    })
    return
  }
}

// POST /api/v1/users - adds a user
export const addUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userData: userType = request.body

  try {
    const hashedPassword = await hash(userData.password, 12)

    const newUser = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    })

    response.status(StatusCodes.CREATED)
  } catch (error: any) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" })
  }
  return
}
