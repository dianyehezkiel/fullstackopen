import { NewPatient, Gender, PatientFormFields, Entry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseString = (text: unknown, dataName: string): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${dataName}`);
  }
  return text;
};

const parseDob = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error(`Incorrect or missing date of birth: ${date}`);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: PatientFormFields): NewPatient => {
  const entries: Entry[] = [];

  const newPatient: NewPatient = {
    name: parseString(name, 'name'),
    dateOfBirth: parseDob(dateOfBirth),
    ssn: parseString(ssn, 'SSN'),
    gender: parseGender(gender),
    occupation: parseString(occupation, 'occupation'),
    entries,
  };

  return newPatient;
};

export default toNewPatient;