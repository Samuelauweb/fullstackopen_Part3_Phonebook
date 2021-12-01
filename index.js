require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Phone = require('./models/phone')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

// Morgan
morgan.token('type', function (req, res) {
  return req.headers['content-type']
})

morgan.token('post', request => {
  if (request.method === 'POST'){
    return JSON.stringify(request.body)
  } else {
    return ''
  }
})

morgan.format(
  'postFormat',
  ':method :url :status :res[content-length] - :response-time ms :type :post'
)

app.use(morgan('postFormat'))

// GET all phones
app.get('/api/persons', (request, response) => {
  Phone.find({}).then(phone => {
    response.json(phone)
  })
})

// GET a specific page
app.get('/info', (request, response) => {
  response.send(`
  <p>Phonebook has info for ${phonebook.length} people</p>
  <p>${new Date()}</p>`)
})

// GET a phone
app.get('/api/persons/:id', (request, response) => {
  // const id = Number(request.params.id)
  // const phone = phonebook.find((p) => {
  //   // console.log(p.id, typeof p.id, id, typeof id, p.id === id);
  //   return p.id === id
  // })
  Phone.findById(request.params.id).then(phone => response.json(phone))

  // if (phone) {
  //   // console.log("phone:",phone);
  //   return phone
  // } else {
  //   response.status(404).send('The phone you are looking for does not exist!')
  // }
})

// POST or create a phone
const generateId = () => {
  const maxId =
    phonebook.length > 0
      ? Math.floor(Math.random(...phonebook.map((p) => p.id)) * 1000)
      : 0
  return maxId + 1
}
app.post('/api/persons', (request, response) => {
  const body = request.body
  // console.log('body:', body)

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing',
    })
  }
  if (phonebook.find((p) => p.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique',
    })
  }

  const phone = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  phonebook = phonebook.concat(phone)
  // console.log('phonebook:', phonebook)

  response.json(phone)
})

// DELETE a phone
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phonebook = phonebook.filter((p) => p.id !== id)

  response.status(204).end()
})

// Middleware for catching requests made to non-existent routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})

