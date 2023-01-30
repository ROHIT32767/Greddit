const SubGreddit = require("../models/SubGreddit.model")
const Posts = require("../models/Posts.model")
const Report = require("../models/Report.model")
const { request } = require('express')
const SubGredditRouter = require('express').Router()

SubGredditRouter.post('/', async (request, response) => {
    console.log(request.body)
    const { Name,
        Description,
        Tags,
        Banned,
        Moderator,
        Followers } = request.body
    const date = Date.parse(request.body.date)
    const subgreddit = new SubGreddit({
        Name,
        Description,
        Tags,
        Banned,
        Moderator,
        Followers,
        date
    })
    const savedsubgreddit = await subgreddit.save()
    console.log(savedsubgreddit)
    response.status(201).json(savedsubgreddit)
})

SubGredditRouter.get('/', async (request, response) => {
    const AllSubGreddits = await SubGreddit
        .find({}).populate('Post').populate('Moderator').populate('Followers').populate('Reports').populate('Followed').populate('JoinRequests')
    response.json(AllSubGreddits)
})

SubGredditRouter.get('/:id', async (request, response) => {
    const ID = request.params.id
    const subgreddit = await SubGreddit
        .findById(ID).populate('Post').populate('Moderator').populate('Followers').populate('Reports').populate('Followed').populate('JoinRequests')
    console.log(subgreddit)
    response.json(subgreddit)
})

SubGredditRouter.get('/User/:id', async (request, response) => {
    // ! For 
    const ID = request.params.id
    const AllSubGreddits = await SubGreddit
        .find({}).populate('Post').populate('Moderator').populate('Followers').populate('Reports').populate('Followed').populate('JoinRequests')
    console.log(AllSubGreddits)
    const MySubGreddits = AllSubGreddits.filter(subgreddit => subgreddit.Moderator._id == ID)
    console.log(MySubGreddits)
    response.json(MySubGreddits)
})

// * Related to joining Subgreddit
SubGredditRouter.put('/join/:id', async (request, response) => {
    console.log(request.body)
    const { UserID } = request.body
    const subgreddit = await SubGreddit.findById(request.params.id)
    subgreddit.Followers =  subgreddit.Followers.concat(UserID)
    subgreddit.Followed =  subgreddit.Followed.concat(UserID)
    subgreddit.JoinRequests = subgreddit.JoinRequests.concat(UserID)
    const updatedsubgreddit = await subgreddit.save()
    console.log(updatedsubgreddit)
    response.status(201).json(updatedsubgreddit) 
})


SubGredditRouter.put('/leave/:id', async (request, response) => {
    console.log(request.body)
    const { UserID } = request.body
    const subgreddit = await SubGreddit.findById(request.params.id)
    subgreddit.Followers =  subgreddit.Followers.filter(element => element!=UserID)
    const updatedsubgreddit = await subgreddit.save()
    console.log(updatedsubgreddit)
    response.status(201).json(updatedsubgreddit) 
})

// * Related to Accepting/Rejecting Join Requests
SubGredditRouter.put('/accept/:id', async (request, response) => {
    console.log(request.body)
    const { UserID } = request.body
    const subgreddit = await SubGreddit.findById(request.params.id)
    subgreddit.Followers =  subgreddit.Followers.concat(UserID)
    subgreddit.JoinRequests = subgreddit.JoinRequests.filter(element => element!=UserID)
    subgreddit.Followed =  subgreddit.Followed.concat(UserID)
    const updatedsubgreddit = await subgreddit.save()
    console.log(updatedsubgreddit)
    response.status(201).json(updatedsubgreddit) 
})

SubGredditRouter.put('/reject/:id', async (request, response) => {
    console.log(request.body)
    const { UserID } = request.body
    const subgreddit = await SubGreddit.findById(request.params.id)
    subgreddit.JoinRequests = subgreddit.JoinRequests.filter(element => element!=UserID)
    const updatedsubgreddit = await subgreddit.save()
    console.log(updatedsubgreddit)
    response.status(201).json(updatedsubgreddit) 
})


// * Block Users
SubGredditRouter.put('/block/:id', async (request, response) => {
    console.log(request.body)
    const { UserID } = request.body
    const subgreddit = await SubGreddit.findById(request.params.id)
    subgreddit.Blocked = subgreddit.Blocked.concat(UserID)
    const updatedsubgreddit = await subgreddit.save()
    console.log(updatedsubgreddit)
    response.status(201).json(updatedsubgreddit) 
})



SubGredditRouter.delete('/:id', async (request, response) => {
    const ID = request.params.id
    const subgreddit = await SubGreddit
        .findById(ID).populate('Followers').populate('Post').populate('Reports')
    const PostIDs = subgreddit.Post.map(element => element._id)
    const ReportIDs = subgreddit.Reports.map(element => element._id)
    const deleteallPosts = await Posts.deleteMany({ _id: { $in: PostIDs } })
    console.log("Delete all Posts", deleteallPosts)
    const deleteallReports = await Report.deleteMany({ _id: { $in: ReportIDs } })
    console.log("Delete all Reports", deleteallReports)
    // TODO: Delete Followers ?
    const DeleteSubGreddit = await SubGreddit.findByIdAndDelete(ID)
    response.json(DeleteSubGreddit)
})

module.exports = SubGredditRouter