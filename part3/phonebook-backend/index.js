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

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then((persons) => {
      response.json(persons)
    })
})

app.get('/info', (request, response) => {
  const date = new Date()

  Person.where({}).countDocuments(function(error, count) {
    try {
      if (error) {
        throw error
      }
      const info = `<p>Phonebook has info for ${count} people</p>
        <p>${date}</p>`

      response.send(info)
    } catch (error) {
      console.log(error.message)
      response.status(500).end()
    }
  });
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id, 
    { name, number }, 
    { new: true, runValidators: true, context: 'query' })
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

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const name = body.name? body.name.trim() : ""
  const number = body.number? body.number.trim() : ""

  if(!name) {
    return response.status(400).json({error: "name is missing"})
  } else if (!number) {
    return response.status(400).json({error: "number is missing"})
  }

  Person.where({name:{'$regex' : `^${name.toLowerCase()}$`, '$options' : 'i'}})
    .findOne((error, person) => {
      try {
        if(error) {
          throw error
        }

        if(!person) {
          const person = new Person({
            name: name,
            number: number
          })
        
          person.save()
            .then((savedPerson) => {
              response.status(201).json(savedPerson)
            })
            .catch(error => next(error))
        } else {
          return response.status(400).json({error: "name must be unique"})
        }
      } catch(error) {
        console.log(error.message)
        response.status(500).end()
      }
    }
  )
})

const errorHandler = (error, request, response, next) => {
  console.log(error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformated id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})