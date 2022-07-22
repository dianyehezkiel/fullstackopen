import {
  NewPatient,
  Gender,
  PatientFormFields,
  Entry,
  EntryFormFields,
  NewEntry,
  HealthCheckRating,
  SickLeaveDate,
  Discharge
} from "./types";

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

const isArray = (param: unknown): param is unknown[] => {
  return Array.isArray(param);
};

const isArrayOfString = (codes: unknown[]): codes is string[] => {
  return codes.every((code) => typeof code === 'string' || code instanceof String);
};

const isDischarge = (object: unknown): object is Discharge => {
  return Object.prototype.hasOwnProperty.call(object, 'date')
    && Object.prototype.hasOwnProperty.call(object, 'criteria');
};

const isSickLeave = (object: unknown): object is SickLeaveDate => {
  return Object.prototype.hasOwnProperty.call(object, 'startDate')
    && Object.prototype.hasOwnProperty.call(object, 'endDate');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseString = (text: unknown, dataName: string): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${dataName}`);
  }
  return text;
};

const parseDate = (date: unknown, dataName: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing ${dataName}: ${date}`);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseDiagnosisCodes = (codes: unknown): string[] | undefined => {
  if (!codes || !isArray(codes) || !isArrayOfString(codes)) {
    return undefined;
  }
  return codes;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error(`Incorrect or missing discharge data`);
  }

  return {
    date: parseDate(discharge.date, 'discharge date'),
    criteria: parseString(discharge.criteria, 'discharge criteria')
  };
};

const parseSickLeave = (sickLeave: unknown): SickLeaveDate | undefined => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    return undefined;
  }
  return {
    startDate: sickLeave.startDate,
    endDate: sickLeave.endDate,
  };
};

const parseHealthCheckRating = (rate: unknown): HealthCheckRating => {
  if (!rate || !isHealthCheckRating(rate)) {
    throw new Error(`Incorrect or missing health check rating: ${rate}`);
  }
  return rate;
};

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: PatientFormFields): NewPatient => {
  const entries: Entry[] = [];

  const newPatient: NewPatient = {
    name: parseString(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth, 'date of birth'),
    ssn: parseString(ssn, 'SSN'),
    gender: parseGender(gender),
    occupation: parseString(occupation, 'occupation'),
    entries,
  };

  return newPatient;
};

const toNewHospitalEntry = (entry: EntryFormFields): NewEntry => {
  return {
    type: 'Hospital',
    description: parseString(entry.description, 'description'),
    date: parseDate(entry.date, 'entry date'),
    specialist: parseString(entry.specialist, 'specialist\'s name'),
    diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
    discharge: parseDischarge(entry.discharge),
  };
};

const toNewOccupationalHealthcareEntry = (entry: EntryFormFields): NewEntry => {
  return {
    type: 'OccupationalHealthcare',
    description: parseString(entry.description, 'description'),
    date: parseDate(entry.date, 'entry date'),
    specialist: parseString(entry.specialist, 'specialist\'s name'),
    diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
    employerName: parseString(entry.employerName, 'employer\'s name'),
    sickLeave: parseSickLeave(entry.sickLeave),
  };
};

const toNewHealthCheckEntry = (entry: EntryFormFields): NewEntry => {
  return {
    type: 'HealthCheck',
    description: parseString(entry.description, 'description'),
    date: parseDate(entry.date, 'entry date'),
    specialist: parseString(entry.specialist, 'specialist\'s name'),
    diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
    healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
  };
};

export const toNewEntry = (entry: EntryFormFields): NewEntry => {
  switch (entry.type) {
    case 'Hospital':
      return toNewHospitalEntry(entry);
    case 'OccupationalHealthcareEntry':
      return toNewOccupationalHealthcareEntry(entry);
    case 'HealthCheck':
      return toNewHealthCheckEntry(entry);
    default:
      throw new Error(`Incorrect or missing entry type: ${entry.type}`);
  }
};
