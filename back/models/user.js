const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: [{type:String,maxLength:10,minLength:3}],
    passwordHash: String,
    posts:[{type:mongoose.Schema.Types.ObjectId, ref:"Post"}]
  })
  
  userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
  })
const User = mongoose.model('User', userSchema)
  
 module.exports = User