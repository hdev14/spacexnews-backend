import { MongoClient, Db, Collection } from 'mongodb'

class Mongo {
  private client: MongoClient | null = null
  private db: Db | null = null

  public async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    this.db = this.client.db()
  }

  public getCollection (name: string): Collection | null {
    if (this.db) {
      return this.db.collection(name)
    }

    return null
  }

  public async disconnect (): Promise<void> {
    if (this.client) {
      await this.client.close()
    }
  }
}

export default new Mongo()
