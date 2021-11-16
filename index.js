const morgan = require('morgan')
const express = require('express')
const app = express()

app.use(express.json())

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

let phonebook = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]
// Home page
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// GET all phones
app.get('/api/persons', (request, response) => {
  response.json(phonebook)
})

// GET a specific page
app.get('/info', (request, response) => {
  response.send(`
  <p>Phonebook has info for ${phonebook.length} people</p>
  <p>${new Date()}</p>`)
})

// GET a phone
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const phone = phonebook.find((p) => {
    // console.log(p.id, typeof p.id, id, typeof id, p.id === id);
    return p.id === id
  })

  if (phone) {
    // console.log("phone:",phone);
    response.json(phone)
  } else {
    response.status(404).send('The phone you are looking for does not exist!')
  }
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})

