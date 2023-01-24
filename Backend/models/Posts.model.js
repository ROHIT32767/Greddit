const mongoose = require('mongoose')

const PostsSchema = new mongoose.Schema({
  Text:{type:String,required:true},
  Upvotes:{type:Number,required:true},
  Downvotes:{type:Number,required:true},
  In: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubGreddit'
    }
  ],
  By: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
})

PostsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
  }
})

const Posts = mongoose.model('Posts', PostsSchema)

module.exports = Posts