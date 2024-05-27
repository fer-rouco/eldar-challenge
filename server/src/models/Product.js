const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Product = new Schema({
   category: {
      type: String
   },
   description: {
      type: String
   },
   price: {
      type: String
   },
   image: {
      type: String
   },
   user_id: {
      type: String
   }
}, {
   collection: 'products'
})

module.exports = mongoose.model('Product', Product)