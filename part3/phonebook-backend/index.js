require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

morgan.token('reqBody', (req) => JSON.stringify(req.body));

const morganCustom = morgan(':method :url :status :res[content-length] - :response-time ms :reqBody');

app.use(express.json());
app.use(morganCustom);
app.use(cors());
app.use(express.static('build'));

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then((persons) => response.json(persons));
});

app.get('/info', (request, response) => {
  const date = new Date();

  Person.where({}).countDocuments((err, count) => {
    try {
      if (err) {
        throw err;
      }
      const info = `<p>Phonebook has info for ${count} people</p>
        <p>${date}</p>`;

      response.send(info);
    } catch (error) {
      console.log(error.message);
      response.status(500).end();
    }
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const { body } = request;
  const newName = body.name ? body.name.trim() : '';
  const newNumber = body.number ? body.number.trim() : '';

  if (!newName) {
    return response.status(400).json({ error: 'name is missing' });
  }
  if (!newNumber) {
    return response.status(400).json({ error: 'number is missing' });
  }

  Person.where({ name: { $regex: `^${newName.toLowerCase()}$`, $options: 'i' } })
    .findOne((err, person) => {
      try {
        if (err) {
          throw err;
        }

        if (person) {
          return response.status(400).json({ error: 'name must be unique' });
        }

        const newPerson = new Person({
          name: newName,
          number: newNumber,
        });

        newPerson.save()
          .then((savedPerson) => response.status(201).json(savedPerson))
          .catch((error) => next(error));
      } catch (error) {
        console.log(error.message);
        return response.status(500).end();
      }
    });
});

const errorHandler = (error, request, response, next) => {
  console.log(error);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformated id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
