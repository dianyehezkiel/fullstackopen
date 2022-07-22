/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import {EntryFormFields, PatientFormFields} from '../types';
import {toNewEntry, toNewPatient} from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_reg, res) => {
  res.send(patientService.getPublicPatients());
});

patientsRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatientById(id);

  if (!patient) {
    res.status(404).send(`Cannot find patient with id: ${id}`);
  } else {
    res.send(patient);
  }
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

patientsRouter.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body as EntryFormFields);

    const updatedEntry = patientService.addEntryByPatientId(req.params.id, newEntry);
    if (!updatedEntry) {
      res.status(404).send(`Cannot find patient with id: ${req.params.id}`);
    }

    res.json(updatedEntry);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;