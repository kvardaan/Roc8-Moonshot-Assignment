import { StatusCodes } from "http-status-codes"
import { Request, Response, NextFunction } from "express"

import { fetchSheetData } from "../utils/sheet-data"

export const getSheetData = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const data = await fetchSheetData()

  response.status(StatusCodes.OK).json(data)
  return
}
