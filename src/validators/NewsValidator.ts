import { object, string, date } from 'yup'
import { Request, Response, NextFunction } from 'express'

class NewsValidator {
  public async create (req: Request, res: Response, next: NextFunction) {
    try {
      const schema = object().shape({
        title: string().required(),
        content: string().required(),
        createdAt: date().default(() => new Date())
      })

      await schema.validate(req.body, { strict: true })
      return next()
    } catch (err) {
      return res.status(400).json({
        error: err.message
      })
    }
  }

  public async update (req: Request, res: Response, next: NextFunction) {
    try {
      const schema = object().shape({
        title: string().notRequired(),
        content: string().notRequired()
      })

      await schema.validate(req.body, { strict: true })
      return next()
    } catch (err) {
      return res.status(400).json({
        error: err.message
      })
    }
  }
}

export default new NewsValidator()
