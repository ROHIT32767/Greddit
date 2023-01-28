const Post = require("../models/Posts.model")
const { request } = require('express')
const PostsRouter = require('express').Router()

PostsRouter.post('/', async (request, response) => {
    console.log(request.body)
    const { Text,
        In,
        By } = request.body
    const date = Date.parse(request.body.date)
    const post = new Post({
        Text,
        Upvotes : 0,
        Downvotes : 0,
        In,
        By,
        Comments:[],
        date
    })
    const savedpost = await post.save()
    console.log(savedpost)
    response.status(201).json(savedpost)
})

PostsRouter.get('/', async (request, response) => {
    const AllPosts = await Post
        .find({}).populate('In').populate('By').populate('Comments.commented')
    response.json(AllPosts)
})

PostsRouter.get('/:id', async (request, response) => {
    const ID = request.params.id
    const post = await Post
        .findById(ID).populate('In').populate('By').populate('Comments.commented')
    console.log(post)
    response.json(post)
})

PostsRouter.put('/upvotes/:id', async (request, response) => {
    console.log(request.body)
    const { Upvotes } = request.body
    const post = await Post.findById(request.params.id)
    console.log(post)
    post.Upvotes = Number(Upvotes)
    const updatedpost = await post.save()
    console.log(post)
    response.status(201).json(post) 
})

PostsRouter.put('/downvotes/:id', async (request, response) => {
    console.log(request.body)
    const { Downvotes } = request.body
    const post = await Post.findById(request.params.id)
    post.Downvotes = Number(Downvotes)
    const updatedpost = await post.save()
    console.log(post)
    response.status(201).json(post) 
})

PostsRouter.put('/comments/:id', async (request, response) => {
    console.log(request.body)
    const { Comments } = request.body
    const post = await Post.findById(request.params.id)
    post.Comments = Comments
    const updatedpost = await post.save()
    console.log(post)
    response.status(201).json(post) 
})

PostsRouter.delete('/:id', async (request, response) => {
    const ID = request.params.id
    const DeletePost = await Post.findByIdAndDelete(ID)
    response.json(DeletePost)
})

module.exports = PostsRouter
