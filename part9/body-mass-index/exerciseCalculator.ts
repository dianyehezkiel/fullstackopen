interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
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

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2))