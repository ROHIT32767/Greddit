const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    comment: { type: String },
    commented: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

CommentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
    }
})

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment