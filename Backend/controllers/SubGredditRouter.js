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
    const subgreddit = new SubGreddit({
        Name,
        Description,
        Tags,
        Banned,
        Moderator,
        Followers
    })
    const savedsubgreddit = await subgreddit.save()
    console.log(savedsubgreddit)
    response.status(201).json(savedsubgreddit)  
})

SubGredditRouter.get('/', async (request, response) => {
    const AllSubGreddits = await SubGreddit
        .find({}).populate('Post').populate('Moderator').populate('Followers').populate('Reports')
    response.json(AllSubGreddits)
})

SubGredditRouter.get('/:id', async (request, response) => {
    const ID = request.params.id
    const subgreddit = await SubGreddit
        .findById(ID).populate('Followers').populate('Following').populate('Post').populate('Reports')
    console.log(subgreddit)
    response.json(subgreddit)
})

SubGredditRouter.get('/User/:id', async (request, response) => {
    // ! For 
    const ID = request.params.id
    const AllSubGreddits = await SubGreddit
        .find({}).populate('Post').populate('Moderator').populate('Followers').populate('Reports')
    console.log(AllSubGreddits)
    const MySubGreddits = AllSubGreddits.filter(subgreddit => subgreddit.Moderator._id == ID)
    console.log(MySubGreddits)
    response.json(MySubGreddits)
})




// ! Not part of the Router Actually
SubGredditRouter.put('/following/:id', async (request, response) => {
    // * For Updating Followers Data
    console.log(request.body)
    const { TargetID } = request.body
    // TODO: Have to Check Validity of id , TargetID

    // ! Delete Number 1
    const UserProfile1 = await User.findById(TargetID)
    UserProfile1.Followers = UserProfile1.Followers.filter(element => element._id !== request.params.id)
    const updatedFollowers = await UserProfile1.save()
    console.log("updatedFollowers", updatedFollowers)
    // ! Delete Number 2
    const UserProfile2 = await User.findById(request.params.id)
    UserProfile2.Following = UserProfile2.Following.filter(element => element._id !== TargetID)
    const updatedFollowing = await UserProfile2.save()
    console.log("updatedFollowing", updatedFollowing)
    response.status(201).json(updatedFollowing)
})



SubGredditRouter.delete('/:id', async (request, response) => {
    const ID = request.params.id
    const subgreddit = await SubGreddit
        .findById(ID).populate('Followers').populate('Post').populate('Reports')
    const PostIDs = subgreddit.Post.map(element => element._id)
    const ReportIDs = subgreddit.Reports.map(element => element._id)
    const deleteallPosts = await Posts.deleteMany({ _id: { $in: PostIDs} })
    console.log("Delete all Posts" , deleteallPosts)
    const deleteallReports = await Report.deleteMany({ _id: { $in: ReportIDs} })
    console.log("Delete all Reports" , deleteallReports)
    // TODO: Delete Followers ?
    const DeleteSubGreddit = await SubGreddit.findByIdAndDelete(ID)
    response.json(DeleteSubGreddit) 
})

module.exports = SubGredditRouter