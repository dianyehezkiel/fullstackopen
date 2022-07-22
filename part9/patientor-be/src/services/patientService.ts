import patients from "../../data/patients";
import { Entry, NewEntry, NewPatient, PublicPatient, Patient } from "../types";
import { v1 as uuid } from 'uuid';

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return;
  }

  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntryByPatientId = (patientId: string, entry: NewEntry): Entry | undefined => {
  const patient = getPatientById(patientId);
  
  if (!patient) {
    return;
  }

  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patients.forEach((patient) => {
    if (patient.id === patientId) {
      patient.entries.push(newEntry);
    }
  });

  return newEntry;
};

export default {
  getPublicPatients,
  getPatientById,
  addPatient,
  addEntryByPatientId,
};