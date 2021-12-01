const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to: ', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

  // Define Schema
const phoneSchema = new mongoose.Schema({
  name: String,
  number: {},
})

// Modify the toJSON of the schema
phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Model defining become module exporting
module.exports = mongoose.model('Phone', phoneSchema)