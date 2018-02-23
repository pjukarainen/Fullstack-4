const Blog = require('../models/blog')

const initialBlogs = [
    {
        author: 'Testimies',
        likes: 2
    },
    {
        author: 'Toinen',
        likes: 1
    }
]

const format = (blog) => {
    return {
        author: blog.author,
        likes: blog.likes,
        id: blog._id
    }
}

const nonExistingId = async () => {
    const blog = new Blog()
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(format)
}

module.exports = {
    initialBlogs, format, nonExistingId, blogsInDb
}