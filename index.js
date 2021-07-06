const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

// Hard coded array of persons in the phonebook
let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
]

// Create an Express application
const app = express()
// Use a json-parser middleware to parse JSON requests into JavaScript objects
app.use(express.json())

// Use CORS enabling middleware
app.use(cors())

// Create new token for logging
morgan.token('data', (req, res) => JSON.stringify(req.body))

// Use morgan logger middleware
// Logs in tiny + data token format
// tiny format outputs ':method :url :status :res[content-length] - :response-time ms'
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
)

// Route for getting all persons in the phonebook
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// Route for sending info of amount of people in the phonebook and current time
app.get('/info', (req, res) => {
  const info = `<div>Phonebook has info for ${persons.length} people</div>`
  const time = `<div>${new Date()}</div>`
  res.send(`${info}${time}`)
})

// Route for showing a single number
app.get('/api/persons/:id', (req, res) => {
  // Id in request is a string, conver to Number!
  const id = Number(req.params.id)
  const person = persons.find((p) => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

// Generates a random id number between 1 and 99999999
const generateId = () => {
  return Math.floor(Math.random() * 99999999 + 1)
}

// Route for adding a new person
app.post('/api/persons', (req, res) => {
  const body = req.body
  console.log(body)

  const personExistsAlready = persons.some((p) => p.name === body.name)

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing',
    })
  } else if (!body.number) {
    return res.status(400).json({
      error: 'number missing',
    })
  } else if (personExistsAlready) {
    return res.status(400).json({
      error: 'person with given name already exists',
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)
  res.json(person)
})

// Route for deleting a single person
app.delete('/api/persons/:id', (req, res) => {
  // Id in request is a string, conver to Number!
  const id = Number(req.params.id)

  // Function for checking if person with given id exists in the phonebook
  const personExists = persons.some((p) => p.id === id)

  // Delete person from phonebook if the person exists
  if (personExists) {
    persons = persons.filter((p) => p.id !== id)
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

// Route for unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// Initialize a constant variable for a port
const PORT = process.env.PORT || 3001
// Runs a server that listens to PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
