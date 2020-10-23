import { Request, Response } from 'express'
import { ObjectID } from 'mongodb'
import Mongo from '../database/Mongo'

class NewsController {
  public async index (req: Request, res: Response) {
    const newsCollection = Mongo.getCollection('news')
    const news = await newsCollection.find({}).toArray()

    return res.status(200).json(news)
  }

  public async show (req: Request, res: Response) {
    const newsCollection = Mongo.getCollection('news')
    const news = await newsCollection.findOne({ _id: new ObjectID(req.params.id) })

    return res.status(200).json(news)
  }

  public async create (req: Request, res: Response) {
    const newsCollection = Mongo.getCollection('news')
    const newNews = (await newsCollection?.insertOne({ ...req.body, createdAt: new Date() })).ops[0]

    return res.status(201).json(newNews)
  }

  public async update (req: Request, res: Response) {
    const data = req.body
    const { id } = req.params

    if (!(data.title || data.content)) {
      return res.status(400).json()
    }

    const newsCollection = Mongo.getCollection('news')
    const { result } = await newsCollection.updateOne({ _id: new ObjectID(id) }, { $set: data })

    return result.ok && res.status(200).json()
  }

  public async delete (req: Request, res: Response) {
    const { id } = req.params
    const newsCollection = Mongo.getCollection('news')
    const { result } = await newsCollection.deleteOne({ _id: new ObjectID(id) })

    return result.ok && res.status(200).json()
  }
}

export default new NewsController()
