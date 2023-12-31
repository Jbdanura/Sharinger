const mongoose = require("mongoose")
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 5000
    },
    author:[{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true}],
    likes:[{type:String}],
    date:{
      type: Date,
      default: Date.now
    },
    comments:[{type:mongoose.Schema.Types.ObjectId, ref:"Comment"}]
  })
  
  postSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      delete returnedObject.__v
    }
  })
const Post = mongoose.model('Post', postSchema)
  
module.exports = Post