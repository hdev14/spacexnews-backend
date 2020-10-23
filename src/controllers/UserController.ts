import { Request, Response } from 'express'
import { ObjectID } from 'mongodb'
import Mongo from '../database/Mongo'

class UserController {
  public async index (req: Request, res: Response) {
    const userCollection = Mongo.getCollection('users')
    const users = await userCollection.find({}).toArray()

    return res.status(200).json(users)
  }

  public async show (req: Request, res: Response) {
    const userCollection = Mongo.getCollection('users')
    const user = await userCollection.findOne({ _id: new ObjectID(req.params.id) })

    return res.status(200).json(user)
  }

  public async create (req: Request, res: Response) {
    const usersCollection = Mongo.getCollection('users')
    const newUser = (await usersCollection?.insertOne(req.body)).ops[0]

    return res.status(201).json(newUser)
  }

  public async update (req: Request, res: Response) {
    const data = req.body
    const { id } = req.params

    if (!(data.name || data.email)) {
      return res.status(400).json()
    }

    const userCollection = Mongo.getCollection('users')
    const { result } = await userCollection.updateOne(
      { _id: new ObjectID(id) },
      { $set: data },
      { upsert: false }
    )

    return result.ok && res.status(200).json()
  }

  public async delete (req: Request, res: Response) {
    const { id } = req.params
    const userCollection = Mongo.getCollection('users')
    const { result } = await userCollection.deleteOne({ _id: new ObjectID(id) })

    return result.ok && res.status(200).json()
  }
}

export default new UserController()
