const mongoose = require("mongoose")
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 5000
    },
    author:[{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true}],
    post:[{type:mongoose.Schema.Types.ObjectId,ref:"Post",required:true}],
    date:{
      type: Date,
      default: Date.now
    }
  })
  
  commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      delete returnedObject.__v
    }
  })
const comment = mongoose.model('Comment', commentSchema)
  
module.exports = comment