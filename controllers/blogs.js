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

  blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs.map(formatBlog))
      })
  })
  
  blogRouter.post('/', (request, response) => {
    const body = request.body
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

  module.exports = blogRouter