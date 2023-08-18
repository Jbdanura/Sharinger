const mongoose = require("mongoose")
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 5000
    },
    author:[{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true}],
    date:{
      type: Date,
      default: Date.now
    }
  })
  
  postSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
const Post = mongoose.model('Post', postSchema)
  
module.exports = Post