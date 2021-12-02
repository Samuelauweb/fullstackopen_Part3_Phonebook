require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const app = express()
// const mongoose = require('mongoose')
const Phone = require('./models/phone')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

// Morgan
morgan.token('type', function (req) {
  return req.headers['content-type']
})

morgan.token('post', (request) => {
  if (request.method === 'POST') {
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
  Phone.find({}).then((phone) => {
    response.json(phone)
  })
})

// GET a specific page
app.get('/info', (request, response) => {
  Phone.find({}).then(() => {
    response.send(`
    <p>Phonebook has info for ${Phone.length} people</p>
    <p>${new Date()}</p>`)
  })
})

// GET a phone
app.get('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // const phone = phonebook.find((p) => {
  //   // console.log(p.id, typeof p.id, id, typeof id, p.id === id);
  //   return p.id === id
  // })
  Phone.findById(request.params.id)
    .then((phone) => {
      if (phone) {
        response.json(phone)
      } else {
        response
          .status(404)
          .send('The phone you are looking for does not exist!')
      }
    })
    .catch((error) => {
      // console.log(error)
      // response.status(400).send({error: 'malformatted id'})
      next(error)
    })
})

// (POST) create a phone
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log('body:', body)

  if (body.name === undefined) {
    return response.status(400).json({
      error: 'name missing',
    })
  }

  if (body.number === undefined) {
    return response.status(400).json({
      error: 'number missing',
    })
  }

  const phone = new Phone({
    name: body.name,
    number: body.number,
  })

  phone
    .save()
    .then((savedPhone) => savedPhone.toJSON())
    .then((savedAndFormattedPhone) => {
      response.json(savedAndFormattedPhone)
    })
    .catch((error) => next(error))
})

// (PUT) Update a phone
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const phone = {
    name: body.name,
    number: body.number,
  }

  const opts = { runValidators: true }
  Phone.findByIdAndUpdate(request.params.id, phone, { new: true, opts })
    .then((updatedPhone) => {
      response.json(updatedPhone)
    })
    .catch((error) => next(error))
})

// DELETE a phone
app.delete('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // phonebook = phonebook.filter((p) => p.id !== id)
  Phone.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error))
})

// Middleware for catching requests made to non-existent routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// Express error handler
// this has to be the last loaded middleware.
const errorHandler = (error, request, response, next) => {
  console.error('Error message:', error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
