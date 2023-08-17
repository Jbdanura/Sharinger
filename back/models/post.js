const mongoose = require("mongoose")
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}]
  })
  
  postSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
const Post = mongoose.model('Post', postSchema)
  
module.exports = Post