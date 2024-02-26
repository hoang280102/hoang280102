import { NextFunction, RequestHandler, Request, Response } from 'express'

export const handlerEror = (func: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
