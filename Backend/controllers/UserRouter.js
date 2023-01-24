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

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('Users')
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const ID = request.params.id
  const users = await User
    .findById(ID).populate('Users')
  users.id = ID
  console.log(users)
  response.json(users)
})

usersRouter.put('/',async(request,response)=>{
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
  
})

module.exports = usersRouter