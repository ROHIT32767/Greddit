const SubGreddit = require("../models/SubGreddit.model")
const config = require('../utils/config')
const Posts = require("../models/Posts.model")
const Report = require("../models/Report.model")
const { request } = require('express')
// const fs = require("fs");
const SubGredditRouter = require('express').Router()
var nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false,
    auth: {
        user: "greddit172@gmail.com",
        pass: config.SMTP_PASSWORD
    }
})
const multer = require("multer")
const upload = multer({ dest: "uploads/" })
const ImageKit = require("imagekit")
const imageKit = new ImageKit({
    publicKey: "public_IJLi9UAoKESgixezLLWdRZIoYlM=",
    privateKey: "private_vA7l2KfiHmMR5ETWryTRlgWLYS8=",
    urlEndpoint: "https://imagekit.io/dashboard/url-endpoints/lksjdf7sd"
})
SubGredditRouter.post('/', upload.single("file"), async (request, response) => {
    console.log(request.body)
    const { Name,
        Description,
        Tags,
        Banned,
        Moderator,
        Followers } = request.body
    const time = Date.now()
    const date = Date.parse(request.body.date)
    const subgreddit = new SubGreddit({
        Name,
        Description,
        Tags,
        Banned,
        Moderator,
        Followers,
        date,
        JoinRequests: [],
        Blocked: [],
        Reports: [],
        Post: [],
        Reported: [],
        Clicks: 0,
        PostGrowthData: [],
        ClickGrowthData: [],
        ImageURL: ImageURL
    })
    const savedsubgreddit = await subgreddit.save()
    savedsubgreddit.GrowthData = [{ date: new Date(), Join: true, User: savedsubgreddit._id }]
    const timeseconds = Date.now()
    savedsubgreddit.creationdate = timeseconds
    const postsavedsubgreddit = await savedsubgreddit.save()
    console.log(postsavedsubgreddit)
    response.status(201).json(postsavedsubgreddit)
})

SubGredditRouter.get('/', async (request, response) => {
    const AllSubGreddits = await SubGreddit
        .find({}).populate('Post').populate('Moderator').populate('Followers').populate('Reports').populate('Followed').populate('JoinRequests').populate('Blocked')
    response.json(AllSubGreddits)
})

SubGredditRouter.get('/:id', async (request, response) => {
    const ID = request.params.id
    const subgreddit = await SubGreddit
        .findById(ID).populate('Post').populate('Moderator').populate('Followers').populate('Reports').populate('Followed').populate('JoinRequests').populate('Blocked')
    console.log(subgreddit)
    const ModeratorID = subgreddit.Moderator._id
    const userid = request.user._id
    if (ModeratorID == userid) {
        response.json(subgreddit)
    }
    else {
        const Blockedids = subgreddit.Blocked.map(element => element._id)
        const UpdatedPosts = subgreddit.Post.map(element => Blockedids.includes(element._id) ? { ...element, By: { ...By, Username: "Blocked User" } } : element)
        subgreddit.Post = UpdatedPosts
        response.json(subgreddit)
    }
})

SubGredditRouter.get('/User/:id', async (request, response) => {
    // ! For 
    const ID = request.params.id
    const AllSubGreddits = await SubGreddit
        .find({}).populate('Post').populate('Moderator').populate('Followers').populate('Reports').populate('Followed').populate('JoinRequests').populate('Blocked')
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
    subgreddit.JoinRequests = subgreddit.JoinRequests.concat(UserID)
    // const updatedsubgreddit = await subgreddit.save()
    const updatedsubgreddit = await SubGreddit.findByIdAndUpdate(subgreddit._id, subgreddit, { new: true })
    console.log(updatedsubgreddit)
    response.status(201).json(updatedsubgreddit)
})


SubGredditRouter.put('/leave/:id', async (request, response) => {
    console.log(request.body)
    const { UserID } = request.body
    const subgreddit = await SubGreddit.findById(request.params.id)
    subgreddit.Followers = subgreddit.Followers.filter(element => element != UserID)
    subgreddit.GrowthData = subgreddit.GrowthData.concat({ date: new Date(), User: UserID, Join: false })
    // const updatedsubgreddit = await subgreddit.save()
    const updatedsubgreddit = await SubGreddit.findByIdAndUpdate(subgreddit._id, subgreddit, { new: true })
    console.log(updatedsubgreddit)
    response.status(201).json(updatedsubgreddit)
})

// * Related to Accepting/Rejecting Join Requests
SubGredditRouter.put('/accept/:id', async (request, response) => {
    console.log(request.body)
    const { UserID } = request.body
    const subgreddit = await SubGreddit.findById(request.params.id)
    subgreddit.Followers = subgreddit.Followers.concat(UserID)
    subgreddit.JoinRequests = subgreddit.JoinRequests.filter(element => element != UserID)
    subgreddit.Followed = subgreddit.Followed.concat(UserID)
    subgreddit.GrowthData = subgreddit.GrowthData.concat({ date: new Date(), User: UserID, Join: true })
    // const updatedsubgreddit = await subgreddit.save()
    const updatedsubgreddit = await SubGreddit.findByIdAndUpdate(subgreddit._id, subgreddit, { new: true })
    console.log(updatedsubgreddit)
    response.status(201).json(updatedsubgreddit)
})

SubGredditRouter.put('/reject/:id', async (request, response) => {
    console.log(request.body)
    const { UserID } = request.body
    const subgreddit = await SubGreddit.findById(request.params.id)
    subgreddit.JoinRequests = subgreddit.JoinRequests.filter(element => element != UserID)
    const updatedsubgreddit = await SubGreddit.findByIdAndUpdate(subgreddit._id, subgreddit, { new: true })
    // const updatedsubgreddit = await subgreddit.save()
    console.log(updatedsubgreddit)
    response.status(201).json(updatedsubgreddit)
})


// * Block Users
// TODO: Update body required for email in Frontend
SubGredditRouter.put('/block/:id', async (request, response) => {
    console.log(request.body)
    const { UserID, from, ReportOnUsername, ReportedByUsername, ReportByEmail, ReportOnEmail, SubGredditName } = request.body
    const subgreddit = await SubGreddit.findById(request.params.id)
    subgreddit.Blocked = subgreddit.Blocked.concat(UserID)
    const updatedsubgreddit = await SubGreddit.findByIdAndUpdate(subgreddit._id, subgreddit, { new: true })
    // const updatedsubgreddit = await subgreddit.save()
    console.log(updatedsubgreddit)
    let mailOptions = {
        from: "greddit172@gmail.com",
        to: ReportByEmail,
        subject: "Action is taken based on your Report",
        text: `Welcome Gredditian!!!!
        Your Report on ${ReportOnUsername} has been analsysed
        and ${ReportOnUsername} has been banned from the SubGreddit ${SubGredditName}`
    };
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Email sent successfully");
        }
    });
    mailOptions = {
        from: "greddit172@gmail.com",
        to: ReportOnEmail,
        subject: "Action is taken on you Based on a Report",
        text: `Welcome Gredditian!!!!
        Based on a Report from  ${ReportedByUsername} and after thorough Analysis
        You haved been banned from the SubGreddit ${SubGredditName}`
    };
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Email sent successfully");
        }
    });
    response.status(201).json(updatedsubgreddit)
})

// Delete Report
SubGredditRouter.put('/Reports/:id', async (request, response) => {
    console.log(request.body)
    const { ReportID } = request.body
    const subgreddit = await SubGreddit.findById(request.params.id)
    subgreddit.Reports = subgreddit.Reports.filter(element => element != ReportID)
    const updatedsubgreddit = await SubGreddit.findByIdAndUpdate(subgreddit._id, subgreddit, { new: true })
    // const updatedsubgreddit = await subgreddit.save()
    console.log(updatedsubgreddit)
    response.status(201).json(updatedsubgreddit)
})

// Delete Post
// TODO: Update body for Email Requests
SubGredditRouter.put('/Posts/:id', async (request, response) => {
    console.log(request.body)
    const { PostID, from, ReportOnUsername, ReportedByUsername, ReportByEmail, ReportOnEmail, SubGredditName } = request.body
    const subgreddit = await SubGreddit.findById(request.params.id)
    subgreddit.Post = subgreddit.Post.filter(element => element != PostID)
    // const updatedsubgreddit = await subgreddit.save()
    const updatedsubgreddit = await SubGreddit.findByIdAndUpdate(subgreddit._id, subgreddit, { new: true })
    let mailOptions = {
        from: "greddit172@gmail.com",
        to: ReportByEmail,
        subject: "Action is taken based on your Report",
        text: `Welcome Gredditian!!!!
        Your Report on ${ReportOnUsername} has been analsysed
        and the Reported Post has been deleted from the SubGreddit ${SubGredditName}`
    };
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Email sent successfully");
        }
    });
    mailOptions = {
        from: "greddit172@gmail.com",
        to: ReportOnEmail,
        subject: "Action is taken on you Based on a Report",
        text: `Welcome Gredditian!!!!
        Based on a Report from  ${ReportedByUsername} and after thorough Analysis
        Your post has been deleted  from the SubGreddit ${SubGredditName}`
    };
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Email sent successfully");
        }
    });
    console.log(updatedsubgreddit)
    response.status(201).json(updatedsubgreddit)
})

// Update Clicks 
SubGredditRouter.put('/Click/:id', async (request, response) => {
    console.log(request.body)
    const subgreddit = await SubGreddit.findById(request.params.id)
    const date = new Date()
    subgreddit.Clicks = subgreddit.Clicks.concat(date)
    const timeseconds = Date.now()
    subgreddit.ClickGrowthData = subgreddit.ClickGrowthData.concat(Number(timeseconds))
    // const updatedsubgreddit = await subgreddit.save()
    const updatedsubgreddit = await SubGreddit.findByIdAndUpdate(subgreddit._id, subgreddit, { new: true })
    console.log(updatedsubgreddit)
    response.status(201).json(updatedsubgreddit)
})

// To update GrowthData via API call
SubGredditRouter.put('/GrowthData/:id', async (request, response) => {
    console.log(request.body)
    const subgreddit = await SubGreddit.findById(request.params.id)
    const { newelement } = request.body
    subgreddit.GrowthData = subgreddit.GrowthData.concat(newelement)
    const updatedsubgreddit = await subgreddit.save()
    // const updatedsubgreddit = await SubGreddit.findByIdAndUpdate(subgreddit._id,subgreddit,{new:true})
    console.log(updatedsubgreddit)
    response.status(201).json(updatedsubgreddit)
})

SubGredditRouter.delete('/RemoveUser/:id', async (request, response) => {
    console.log(request.body)
    const { UserID } = request.body
    const subgreddit = await SubGreddit.findById(request.params.id)
    subgreddit.Followers = subgreddit.Followers.filter(element => element != UserID)
    subgreddit.Reports = subgreddit.Reports.filter(element => element.On != UserID)
    // const updatedsubgreddit = await subgreddit.save()
    const updatedsubgreddit = await SubGreddit.findByIdAndUpdate(subgreddit._id, subgreddit, { new: true })
    console.log(updatedsubgreddit)
    response.status(201).json(updatedsubgreddit)
})

SubGredditRouter.delete('/:id', async (request, response) => {
    const ID = request.params.id
    const subgreddit = await SubGreddit
        .findById(ID).populate('Followers').populate('Post').populate('Reports').populate('Reported')
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
// function uploadFile(req, res) {
//     const time = Date.now()
//     console.log("req.file", req.file)
//     // const FILE = req.file
//     if (req.file) {
//         imageKit.upload({
//             file: req.file,
//             fileName: req.fileName,
//             folder: 'user_avatars'
//         }, function (err, response) {
//             if (err) {
//                 console.log(err)
//                 return res.status(500).json({
//                     status: "failed",
//                     message: "An error occured during file upload. Please try again."
//                 })
//             } else {
//                 const { url } = response
//                 const modifiedUrl = imageKit.url({
//                     src: url,
//                     transformation: [
//                         {
//                             height: "100",
//                             width: "100",
//                             quality: "50",
//                             format: "png",
//                             overlayText: "ImageKit",
//                             overlayTextColor: "purple",
//                             focus: "auto"
//                         }
//                     ]
//                 })
//                 req.ImageURL = modifiedUrl
//                 console.log("modifiedURL", modifiedUrl)
//                 res.json({ status: "success", message: "Successfully uploaded files" });
//             }
//         })
//     }
// }
// SubGredditRouter.post("/upload", upload.single("file"), uploadFile)
module.exports = SubGredditRouter