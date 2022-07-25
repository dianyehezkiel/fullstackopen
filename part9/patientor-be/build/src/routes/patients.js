"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const patientsRouter = express_1.default.Router();
patientsRouter.get('/', (_reg, res) => {
    res.send(patientService_1.default.getPublicPatients());
});
patientsRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientService_1.default.getPatientById(id);
    if (!patient) {
        res.status(404).send(`Cannot find patient with id: ${id}`);
    }
    else {
        res.send(patient);
    }
});
patientsRouter.post('/', (req, res) => {
    try {
        const newPatient = (0, utils_1.toNewPatient)(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
patientsRouter.post('/:id/entries', (req, res) => {
    try {
        const newEntry = (0, utils_1.toNewEntry)(req.body);
        const updatedEntry = patientService_1.default.addEntryByPatientId(req.params.id, newEntry);
        if (!updatedEntry) {
            res.status(404).send(`Cannot find patient with id: ${req.params.id}`);
        }
        res.json(updatedEntry);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = patientsRouter;
