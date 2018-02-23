const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { format, initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')

beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = initialBlogs.map(n => new Blog(n))
    await Promise.all(blogObjects.map(n => n.save()))
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('blogs are posted correctly', async () => {
    const blogsAtStart = await blogsInDb()

    const newBlog = {
        author: 'Testimies',
        likes: 4
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

    const authorMan = blogsAfterOperation.map(r => r.author)
    expect(authorMan).toContain('Testimies')

})

describe('deletion of a blog', async () => {
    let addedBlog

    beforeAll(async () => {
      addedBlog = new Blog({
        author: 'poisto pyynnöllä HTTP DELETE',
        likes: 2
      })
      await addedBlog.save()
    })

    test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
      const blogsAtStart = await blogsInDb()

      await api
        .delete(`/api/blogs/${addedBlog._id}`)
        .expect(204)

      const blogsAfterOperation = await blogsInDb()

      const authorMan = blogsAfterOperation.map(r => r.author)

      expect(authorMan).not.toContain(addedBlog.author)
      expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)
    })
  })

afterAll(() => {
    server.close()
  })