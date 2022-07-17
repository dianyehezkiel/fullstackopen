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

console.log(calculateBmi(180, 74))