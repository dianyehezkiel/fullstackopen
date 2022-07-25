"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getPublicPatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const getPatientById = (id) => {
    const patient = patients_1.default.find((p) => p.id === id);
    if (!patient) {
        return;
    }
    return patient;
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, patient);
    patients_1.default.push(newPatient);
    return newPatient;
};
const addEntryByPatientId = (patientId, entry) => {
    const patient = getPatientById(patientId);
    if (!patient) {
        return;
    }
    const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patients_1.default.forEach((patient) => {
        if (patient.id === patientId) {
            patient.entries.push(newEntry);
        }
    });
    return newEntry;
};
exports.default = {
    getPublicPatients,
    getPatientById,
    addPatient,
    addEntryByPatientId,
};
