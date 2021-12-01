const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

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
  name: {
    type: String,
    minLength: [3, 'Name must have at least 3 characters'],
    required: true,
    unique: true,
  },
  number: {
    type: String,
    minlength: [8, 'Number must have at least 8 characters'],
    required: true,
    unique: true,
  },
})

// Modify the toJSON of the schema
phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

phoneSchema.plugin(uniqueValidator)

// Model defining become module exporting
module.exports = mongoose.model('Phone', phoneSchema)