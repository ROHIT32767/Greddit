const mongoose = require('mongoose')

const SubGredditSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Description: { type: String, required: true },
    Tags: [
        {
            type: String,
        }
    ],
    Banned: [
        {
            type: String,
        }
    ],
    Moderator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    Post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Posts'
        }
    ]
})

SubGredditSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
    }
})

const SubGreddit = mongoose.model('SubGreddit', SubGredditSchema)

module.exports = SubGreddit