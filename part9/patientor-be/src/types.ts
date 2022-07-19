export type PatientFormFields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
};

export interface Diagnose {
  code: string,
  name: string,
  latin?: string,
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
}

export type NoSsnPatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;