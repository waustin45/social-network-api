const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  email: { type: String, required: true },
  thoughts: { type: String },
  friendCount: { type: Number }
});



const user = mongoose.model('User', userSchema);

userSchema.methods.addFriend = function () {
   return user.updateOne(
    {
        friendCount: this.friendCount + 1
    }
   )
}

module.exports = user;