export type PatientFormFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type NewPatient = Omit<Patient, 'id'>;