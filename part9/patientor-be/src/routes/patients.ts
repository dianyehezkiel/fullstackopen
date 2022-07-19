/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import { PatientFormFields } from '../types';
import toNewPatient from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_reg, res) => {
  res.send(patientService.getNoSsnPatients());
});

patientsRouter.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body as PatientFormFields);
  
    const addedPatient = patientService.addPatient(newPatient);
  
    res.json(addedPatient);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;