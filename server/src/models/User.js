const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let User = new Schema({
   first_name: {
      type: String,
      default: null 
   },
   last_name: {
      type: String,
      default: null
   },
   email: {
      type: String, unique: true 
   },
   password: { 
      type: String 
   },
   token: {
      type: String 
   },
   profile: {
      type: String
   },
}, {
   collection: 'users'
})

module.exports = mongoose.model('User', User)