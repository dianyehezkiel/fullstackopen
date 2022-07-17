interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

// deh = daily exercise hours
interface dehAndTarget {
  deh: Array<number>,
  target: number
}

const parseExercisesArguments = (args: Array<string>): dehAndTarget => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (isNaN(Number(args[2]))) {
    throw new Error('Provided values were not numbers!');
  }

  let deh: Array<number> = [];

  for (let i = 3; i < args.length; i++) {
    const n = Number(args[i]);

    if (isNaN(n)) {
      throw new Error('Provided values were not numbers!');
    }

    deh.push(n);
  }

  return {
    deh,
    target: Number(args[2])
  }
}

const calculateExercise = (deh: Array<number>, target: number): Result => {
  const periodLength = deh.length
  const trainingDays = deh.filter((h) => h > 0).length
  const average = deh.reduce((r, h) => r + h, 0) / periodLength
  const success = average > target
  const successRate = average / target
  let rating;
  let ratingDescription;

  switch (true) {
    case (successRate < 0.5):
      rating = 1;
      ratingDescription = 'Off target. You should work harder!';
      break;
    case (successRate < 1):
      rating = 2;
      ratingDescription = 'Not too bad but could be better!';
      break;
    case (successRate >= 1):
      rating = 3;
      ratingDescription = 'Congratulations! You are on target.';
      break;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

try {
  const { deh, target } = parseExercisesArguments(process.argv);
  console.log(calculateExercise(deh, target));
} catch (error: unknown) {
  let errorMessage = 'Something wrong happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }

  console.log(errorMessage);
}