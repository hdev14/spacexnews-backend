import express, { Express } from 'express'
import cors from 'cors'

import routes from './routes'

import globalErrorHandler from './middlewares/global-error-handler'

class App {
  public server: Express

  constructor () {
    this.server = express()
    this.globalMiddlewares()
    this.routes()
    this.globalErrorHandler()
  }

  private globalMiddlewares () {
    this.server.use(express.json())
    this.server.use(cors())
  }

  private routes () {
    this.server.use(routes)
  }

  private globalErrorHandler () {
    this.server.use(globalErrorHandler)
  }
}

export default new App()
