import patients from "../../data/patients";
import { NewPatient, NoSsnPatient, Patient } from "../types";
import { v1 as uuid } from 'uuid';

const getNoSsnPatients = (): NoSsnPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient) : Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getNoSsnPatients,
  addPatient,
};