import { Request, Response } from 'express'
import Mongo from '../database/Mongo'
import path from 'path'
import fs from 'fs'

import notfoundError from '../helpers/notfound-error'

class UserController {
  public async index (req: Request, res: Response) {
    const userCollection = Mongo.getCollection('users')
    const users = await userCollection.find({}).toArray()
    return res.status(200).json(users)
  }

  public async create (req: Request, res: Response) {
    const data = req.body
    const usersCollection = Mongo.getCollection('users')
    const newUser = (await usersCollection?.insertOne(data)).ops[0]
    return res.status(201).json(newUser)
  }

  public async update (req: Request, res: Response) {
    // try {
    //   const repository = getRepository(User)
    //   const user = await repository.findOneOrFail(req.params.id)
    //   repository.merge(user, req.body)
    //   const updatedUser = await repository.save(user)
    //   return res.json(updatedUser)
    // } catch (err) {
    //   return notfoundError(err)
    // }
    const data = req.body
    const { id } = req.params
    const userCollection = Mongo.getCollection('users')

    try {
      const { result } = await userCollection.updateOne({ _id: id }, { $set: data })
      return result.ok && res.status(200).json()
    } catch (err) {
      return res.status(400).json()
    }
  }

  public async updatePhoto (req: Request, res: Response) {
    // try {
    //   const { filename } = req.file
    //   const repository = getRepository(User)
    //   const user = await repository.findOneOrFail(req.userId)

    //   if (user.photo) {
    //     const tmpPath = path.resolve(__dirname, '..', '..', 'tmp')
    //     const filePath = path.join(tmpPath, user.photo)

    //     const file = await fs.promises.stat(filePath)
    //     if (file.isFile()) {
    //       await fs.promises.unlink(filePath)
    //     }
    //   }
    //   user.photo = filename
    //   const updatedUser = await repository.save(user)
    //   return res.json(updatedUser)
    // } catch (err) {
    //   return notfoundError(err)
    // }
  }

  public async delete (req: Request, res: Response) {
    const { id } = req.params
    const userCollection = Mongo.getCollection('users')
    const { result } = await userCollection.deleteOne({ _id: id })
    return result.ok && res.status(200).json()
  }
}

export default UserController
