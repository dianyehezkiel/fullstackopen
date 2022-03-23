const express =  require('express')
const app = express()
const morgan = require('morgan')
const morganTiny = morgan('tiny')

app.use(express.json())
app.use(morganTiny)

persons = [
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
  response.json(persons)
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

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id != id)

  response.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random() * 99999999)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name.trim()) {
    return response.status(400).json({error: "name is missing"})
  } else if(!body.number.trim()) {
    return response.status(400).json({error: "number is missing"})
  } else {
    const nameExist = persons.find(p => p.name.toLowerCase() === body.name.trim().toLowerCase())

    if(nameExist){
      return response.status(400).json({error: "name must be unique"})
    }
  }

  const person = {
    id: generateId(),
    name: body.name.trim(),
    number: body.number.trim()
  }

  persons = persons.concat(person)

  response.status(201).json(person)
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})