import { Request, Response } from 'express'
import Mongo from '../database/Mongo'

class UserController {
  public async index (req: Request, res: Response) {
    const userCollection = Mongo.getCollection('users')
    const users = await userCollection.find({}).toArray()

    return res.status(200).json(users)
  }

  public async create (req: Request, res: Response) {
    const usersCollection = Mongo.getCollection('users')
    const newUser = (await usersCollection?.insertOne(req.body)).ops[0]

    return res.status(201).json(newUser)
  }

  public async update (req: Request, res: Response) {
    const data = req.body
    const { id } = req.params

    try {
      const userCollection = Mongo.getCollection('users')
      const { result } = await userCollection.updateOne({ _id: id }, { $set: data })

      return result.ok && res.status(200).json()
    } catch (err) {
      return res.status(400).json()
    }
  }

  public async delete (req: Request, res: Response) {
    const { id } = req.params
    const userCollection = Mongo.getCollection('users')
    const { result } = await userCollection.deleteOne({ _id: id })

    return result.ok && res.status(200).json()
  }
}

export default UserController
