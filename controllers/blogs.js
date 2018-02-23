const blogRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
    return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

  blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(formatBlog))
  })
  

  blogRouter.delete('/:id', async (req, res) => {
    try {
      await Blog.findByIdAndRemove(req.params.id)

      res.status(204).end()
    } catch (exception) {
      console.log(exception)
      res.status(400).send({ error: 'malformatted id' })
    }
  })

  blogRouter.post('/', async (request, response) => {
  
    try {
      const body = request.body

      if (body.author === undefined) {
        return response.status(400).json({ error: 'is broke'})
      }

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
      })

      const savedBlog = await blog.save()
      response.json(formatBlog(blog))
    } catch (exception) {
      console.log(exception)
      response.status(500).json({ error: 'something when wrong'})
    }
  })

  module.exports = blogRouter