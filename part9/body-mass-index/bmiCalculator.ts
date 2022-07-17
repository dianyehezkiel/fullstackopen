interface HeightAndWeight {
  height: number,
  weight: number
}

const parseBmiArguments = (args: Array<string>): HeightAndWeight => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (h: number, w: number) : string => {
  const bmi = w / Math.pow(h/100, 2);
  switch (true) {
    case (bmi < 16.0):
      return 'Underweight (Severe thinness)';
    case (bmi < 17.0):
      return 'Underweight (Moderate thinness)';
    case (bmi < 18.5):
      return 'Underweight (Mild thinness)';
    case (bmi < 25.0):
      return 'Normal (Healthy weight)';
    case (bmi < 30.0):
      return 'Overweight (Pre-obese)';
    case (bmi < 35.0):
      return 'Obese (Class I)';
    case (bmi < 40.0):
      return 'Obese (Class II)';
    case (bmi >= 40.0):
      return 'Obese (Class III)';
  }
}

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something wrong happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }

  console.log(errorMessage);
}