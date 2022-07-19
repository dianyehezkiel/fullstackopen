import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';
const app = express();
app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseNumber = (s: any): number => {
  if (isNaN(Number(s))) {
    throw new Error();
  }

  return Number(s);
};

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req, res) => {
  try {
    if (!req.query.height || !req.query.weight) {
      return res.status(400).json({
        error: 'parameters missing'
      });
    }

    const height = parseNumber(req.query.height);
    const weight = parseNumber(req.query.weight);
    const bmi = calculateBmi(height, weight);

    return res.json({
      weight,
      height,
      bmi,
    });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).json(
        {
          error: 'malformatted parameters'
        }
      );
    }

    return res.status(500).json({
      error: 'Server error'
    });
  }
});

app.post('/exercises', (req, res) => {
  try {
    if (!req.body.daily_exercises || !req.body.target) {
      return res.status(400).json({
        error: 'parameters missing'
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dehAny: Array<any> = req.body.daily_exercises;
    const deh: Array<number> = dehAny.map((v) => parseNumber(v));
    const target = parseNumber(req.body.target);

    const result = calculateExercise(deh, target);

    return res.json(result);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).json({
        error: 'Malformatted parameters'
      });
    }
    return res.status(500).json({
      error: "Server error"
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});