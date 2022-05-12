require('dotenv').config()
const express =  require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('reqBody', (req) => JSON.stringify(req.body))

const morganCustom = morgan(':method :url :status :res[content-length] - :response-time ms :reqBody')

app.use(express.json())
app.use(morganCustom)
app.use(cors())
app.use(express.static('build'))

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then((persons) => {
      response.json(persons)
    })
})

app.get('/info', (request, response) => {
  const date = new Date()

  const info = `<p>Phonebook has info for ${persons.length} people</p>
  <p>${date}</p>`

  response.send(info)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  
  if(person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(res => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// const generateId = () => {
//   return Math.floor(Math.random() * 99999999)
// }

app.post('/api/persons', (request, response) => {
  const body = request.body
  const name = body.name? body.name.trim() : ""
  const number = body.number? body.number.trim() : ""

  if(!name) {
    return response.status(400).json({error: "name is missing"})
  } else if (!number) {
    return response.status(400).json({error: "number is missing"})
  }

  const person = new Person({
    name: name,
    number: number
  })

  person.save()
    .then((savedPerson) => {
      response.status(201).json(savedPerson)
    })
})

const errorHandler = (error, request, response, next) => {
  console.log(error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformated id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})