import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

const parseNumber = (s: string) : number => {
  if (isNaN(Number(s))) {
    throw new Error('Provided values were not numbers!')
  }

  return Number(s)
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi/', (req, res) => {
  try {
    if (!req.query.height || !req.query.weight) {
      throw new Error('parameters height or weight is not provided')
    }

    const height = parseNumber(req.query.height.toString());
    const weight = parseNumber(req.query.weight.toString());
    const bmi = calculateBmi(height, weight);

    return res.json({
      weight,
      height,
      bmi,
    })
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).json(
        {
          error: 'malformatted parameters',
          message: e.message
        }
      )
    }

    return res.status(500).json({
      error: 'Server error'
    })
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});