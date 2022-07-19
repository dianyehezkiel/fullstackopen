import express from 'express';
import patientService from '../services/patientService';

const patientsRouter = express.Router();

patientsRouter.get('/', (_reg, res) => {
  res.send(patientService.getNoSsnPatients());
});

export default patientsRouter;