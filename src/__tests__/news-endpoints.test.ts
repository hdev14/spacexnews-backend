import supertest from 'supertest'
import App from '../App'
import Mongo from '../database/Mongo'

describe('UserController ingrated tests', () => {
  let server: supertest.SuperTest<supertest.Test>

  beforeAll(async () => {
    await Mongo.connect(process.env.MONGO_URL || '')
    server = supertest(App.server)
  })

  afterEach(async () => {
    await Mongo.getCollection('news').deleteMany({})
  })

  afterAll(async () => {
    await Mongo.disconnect()
  })

  it('should create an news', async () => {
    const data = {
      title: 'test title',
      content: 'test content'
    }

    const response = await server.post('/news').send(data)
    expect(response.status).toBe(201)
  })

  it('should return a array of news', async () => {
    const newsCollection = await Mongo.getCollection('news')
    await newsCollection.insertMany([
      {
        title: 'test title 1',
        content: 'test content 1'
      },
      {
        title: 'test title 2',
        content: 'test content 2'
      },
      {
        title: 'test title 3',
        content: 'test content 3'
      }
    ])

    const response = await server.get('/news')
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(3)
  })

  it('should update news', async () => {
    const newsCollection = await Mongo.getCollection('news')
    const news = (await newsCollection.insertOne({
      title: 'test title',
      content: 'test content'
    })).ops[0]

    const dataWithTitle = { title: 'test title updated' }
    let response = await server.put(`/news/${news._id}`).send(dataWithTitle)
    expect(response.status).toBe(200)

    const dataWithContent = { content: 'test content updated' }
    response = await server.put(`/news/${news._id}`).send(dataWithContent)
    expect(response.status).toBe(200)
  })

  it('on PUT:/news should return 400 if no data is passed', async () => {
    const newsCollection = await Mongo.getCollection('users')
    const news = (await newsCollection.insertOne({
      title: 'test title',
      content: 'test content'
    })).ops[0]

    const response = await server.put(`/users/${news._id}`).send({})
    expect(response.status).toBe(400)
  })

  it('should delete an news', async () => {
    const newsCollection = await Mongo.getCollection('news')
    const news = (await newsCollection.insertOne({
      title: 'test title',
      content: 'test content'
    })).ops[0]

    const response = await server.delete(`/news/${news._id}`)
    expect(response.status).toBe(200)
  })

  it('on POST:/news should return 400 if title is not passed', async () => {
    const dataWithoutTitle = {
      content: 'test content'
    }
    const response = await server.post('/news').send(dataWithoutTitle)
    expect(response.status).toBe(400)
    expect(response.body.error).toBeTruthy()
  })

  it('on POST:/news should return 400 if content is not passed', async () => {
    const dataWithoutContent = {
      title: 'test title'
    }
    const response = await server.post('/news').send(dataWithoutContent)
    expect(response.status).toBe(400)
    expect(response.body.error).toBeTruthy()
  })

  it('on POST:/news should return 400 if title is invalid', async () => {
    const dataWithInvalidTitle = {
      title: 123,
      content: 'test content'
    }
    const response = await server.post('/news').send(dataWithInvalidTitle)
    expect(response.status).toBe(400)
    expect(response.body.error).toBeTruthy()
  })

  it('on POST:/news should return 400 if title is invalid', async () => {
    const dataWithInvalidContent = {
      title: 'test title',
      content: 123
    }
    const response = await server.post('/news').send(dataWithInvalidContent)
    expect(response.status).toBe(400)
    expect(response.body.error).toBeTruthy()
  })

  it('on PUT:/news should return 400 if title is invalid', async () => {
    const fakeId = 14
    const dataWithInvalidTitle = {
      title: 123,
      content: 'test content'
    }
    const response = await server.put(`/news/${fakeId}`).send(dataWithInvalidTitle)
    expect(response.status).toBe(400)
    expect(response.body.error).toBeTruthy()
  })

  it('on PUT:/news should return 400 if content is invalid', async () => {
    const fakeId = 14
    const dataWithInvalidContent = {
      title: 'test title',
      content: 123
    }
    const response = await server.put(`/news/${fakeId}`).send(dataWithInvalidContent)
    expect(response.status).toBe(400)
    expect(response.body.error).toBeTruthy()
  })
})
