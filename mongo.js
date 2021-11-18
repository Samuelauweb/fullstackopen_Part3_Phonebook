const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://Samuel123:${password}@cluster0.cduy2.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

// Define Schema
const phoneSchema = new mongoose.Schema({
  name: String,
  number: {}
})

// Define Model
const Phone = mongoose.model('Phone', phoneSchema)
// Define new object
const phone = new Phone({
  name: process.argv[3],
  number: process.argv[4]
})

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
} else if (process.argv.length === 3) {
  // Display all phones from MongoDB
  Phone.find({}).then((result) => {
    result.forEach((phone) => {
      console.log(phone.name, phone.number)
    })
    mongoose.connection.close()
  })
} else {
  // Add new phone to phonebook
  phone.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}
