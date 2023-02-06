const bcrypt = require('bcrypt')
const { request } = require('express')
const usersRouter = require('express').Router()
const User = require('../models/User.model')

usersRouter.post('/', async (request, response) => {
  console.log(request.body)
  const { FirstName,
    LastName,
    Username,
    Email,
    Age,
    ContactNumber,
    password } = request.body

  const existingUser = await User.findOne({ Email })
  if (existingUser) {
    return response.status(400).json({
      error: 'Email must be unique'
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    FirstName,
    LastName,
    Username,
    Email,
    Age,
    ContactNumber,
    passwordHash,
  })
  const savedUser = await user.save()
  console.log(savedUser)
  response.status(201).json(savedUser)
})

// usersRouter.get('/', async (request, response) => {
//   const users = await User
//     .find({}).populate('Followers').populate('Following').populate('SavedPosts')
//   response.json(users)
// })

usersRouter.get('/:id', async (request, response) => {
  const ID = request.params.id
  const users = await User
    .findById(ID).populate('Followers').populate('Following').populate('SavedPosts')
  users.id = ID
  console.log(users)
  response.json(users)
})

usersRouter.put('/update/:id', async (request, response) => {
  // * For Updating Profile Data
  console.log(request.body)
  const { FirstName,
    LastName,
    Username,
    Email,
    Age,
    ContactNumber,
    password } = request.body
  // TODO: Have to Check Validity of Email
  const existingUser = await User.find({ Email })
  if (existingUser.length > 1) {
    return response.status(400).json({
      error: 'Email must be unique'
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const UserProfile = await User.findById(request.params.id)
  UserProfile.Username = Username
  UserProfile.FirstName = FirstName
  UserProfile.Age = Number(Age)
  UserProfile.Email = Email
  UserProfile.ContactNumber = ContactNumber
  UserProfile.passwordHash = passwordHash
  const updateduser = await UserProfile.save()
  console.log(updateduser)
  response.status(201).json(updateduser)
})

usersRouter.put('/addfollowing/:id', async (request, response) => {
  // * For Updating Followers Data
  console.log(request.body)
  const { TargetID } = request.body
  // TODO: Have to Check Validity of id , TargetID
  // ! Add Number 1
  const UserProfile1 = await User.findById(TargetID)
  UserProfile1.Followers = UserProfile1.Followers.concat(request.params.id)
  const updatedFollowers = await UserProfile1.save()
  console.log("updatedFollowers", updatedFollowers)
  // ! Add Number 2
  const UserProfile2 = await User.findById(request.params.id)
  UserProfile2.Following = UserProfile2.Following.concat(TargetID)
  const updatedFollowing = await UserProfile2.save()
  console.log("updatedFollowing", updatedFollowing)
  response.status(201).json(updatedFollowing)
})


usersRouter.put('/addfollowers/:id', async (request, response) => {
  // * For Updating Followers Data
  console.log(request.body)
  const { TargetID } = request.body
  // TODO: Have to Check Validity of id , TargetID

  // ! Add Number 1
  const UserProfile1 = await User.findById(TargetID)
  UserProfile1.Following = UserProfile1.Following.concat(request.params.id)
  const updatedFollowing = await UserProfile1.save()
  console.log("updatedFollowing", updatedFollowing)
  // ! Add Number 2
  const UserProfile2 = await User.findById(request.params.id)
  UserProfile2.Followers = UserProfile2.Followers.concat(TargetID)
  const updatedFollowers = await UserProfile2.save()
  console.log("updatedFollowers", updatedFollowers)
  response.status(201).json(updatedFollowers)
})




usersRouter.put('/following/:id', async (request, response) => {
  // * For Updating Followers Data
  console.log(request.body)
  const { TargetID } = request.body
  // TODO: Have to Check Validity of id , TargetID
  // ! Delete Number 1
  const UserProfile1 = await User.findById(TargetID)
  UserProfile1.Followers = UserProfile1.Followers.filter(element => element != request.params.id)
  const updatedFollowers = await UserProfile1.save()
  console.log("updatedFollowers", updatedFollowers)
  // ! Delete Number 2
  const UserProfile2 = await User.findById(request.params.id)
  UserProfile2.Following = UserProfile2.Following.filter(element => element != TargetID)
  const updatedFollowing = await UserProfile2.save()
  console.log("updatedFollowing", updatedFollowing)
  response.status(201).json(updatedFollowing)
})

usersRouter.put('/followers/:id', async (request, response) => {
  // * For Updating Followers Data
  console.log(request.body)
  const { TargetID } = request.body
  // TODO: Have to Check Validity of id , TargetID

  // ! Delete Number 1
  const UserProfile1 = await User.findById(TargetID)
  UserProfile1.Following = UserProfile1.Following.filter(element => element != request.params.id)
  const updatedFollowing = await UserProfile1.save()
  console.log("updatedFollowing", updatedFollowing)
  // ! Delete Number 2
  const UserProfile2 = await User.findById(request.params.id)
  UserProfile2.Followers = UserProfile2.Followers.filter(element => element != TargetID)
  const updatedFollowers = await UserProfile2.save()
  console.log("updatedFollowers", updatedFollowers)
  response.status(201).json(updatedFollowers)
})

usersRouter.put("/RemoveSavedPosts/:id", async (request, response) => {
  // * For Updating Followers Data
  console.log(request.body)
  const { PostID } = request.body
  const UserProfile = await User.findById(request.params.id)
  UserProfile.SavedPosts = UserProfile.SavedPosts.filter(element => element != PostID)
  const UpdatedSavedPosts = await UserProfile.save()
  console.log("Updated Saved Posts", UpdatedSavedPosts)
  response.status(201).json(UpdatedSavedPosts)
})

usersRouter.put("/AddSavedPosts/:id", async (request, response) => {
  // * For Updating Followers Data
  console.log(request.body)
  const { PostID } = request.body
  const UserProfile = await User.findById(request.params.id)
  UserProfile.SavedPosts = UserProfile.SavedPosts.concat(PostID)
  const UpdatedSavedPosts = await UserProfile.save()
  console.log("Updated Saved Posts", UpdatedSavedPosts)
  response.status(201).json(UpdatedSavedPosts)
})

module.exports = usersRouter