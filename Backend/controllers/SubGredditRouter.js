const SubGreddit = require("../models/SubGreddit.model")

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
        .find({}).populate('Post').populate('Moderator').populate('Followers')
    response.json(AllSubGreddits)
})

SubGredditRouter.get('/:id', async (request, response) => {
    const ID = request.params.id
    const subgreddit = await SubGreddit
        .findById(ID).populate('Followers').populate('Following').populate('Post')
    console.log(subgreddit)
    response.json(subgreddit)
})

SubGredditRouter.get('/User/:id', async (request, response) => {
    // ! For 
    const ID = request.params.id
    const AllSubGreddits = await SubGreddit
        .find({}).populate('Post').populate('Moderator').populate('Followers')
    const MySubGreddits = AllSubGreddits.filter(subgreddit => subgreddit.Moderator.id === ID)
    console.log(MySubGreddits)
    response.json(MySubGreddits)
})


SubGredditRouter.put('/update/:id', async (request, response) => {
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

SubGredditRouter.put('/followers/:id', async (request, response) => {
    // * For Updating Followers Data
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

SubGredditRouter.put('/followers/:id', async (request, response) => {
    // * For Updating Followers Data
    console.log(request.body)
    const { TargetID } = request.body
    // TODO: Have to Check Validity of id , TargetID

    // ! Delete Number 1
    const UserProfile1 = await User.findById(TargetID)
    UserProfile1.Following = UserProfile1.Following.filter(element => element._id !== request.params.id)
    const updatedFollowing = await UserProfile1.save()
    console.log("updatedFollowing", updatedFollowing)
    // ! Delete Number 2
    const UserProfile2 = await User.findById(request.params.id)
    UserProfile2.Followers = UserProfile2.Followers.filter(element => element._id !== TargetID)
    const updatedFollowers = await UserProfile2.save()
    console.log("updatedFollowers", updatedFollowers)
    response.status(201).json(updatedFollowers)
})

module.exports = SubGredditRouter