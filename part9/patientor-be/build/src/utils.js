"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatient = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
const isArray = (param) => {
    return Array.isArray(param);
};
const isArrayOfString = (codes) => {
    return codes.every((code) => typeof code === 'string' || code instanceof String);
};
const isDischarge = (object) => {
    return Object.prototype.hasOwnProperty.call(object, 'date')
        && Object.prototype.hasOwnProperty.call(object, 'criteria');
};
const isSickLeave = (object) => {
    return Object.prototype.hasOwnProperty.call(object, 'startDate')
        && Object.prototype.hasOwnProperty.call(object, 'endDate');
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseString = (text, dataName) => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing ${dataName}`);
    }
    return text;
};
const parseDate = (date, dataName) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing ${dataName}: ${date}`);
    }
    return date;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};
const parseDiagnosisCodes = (codes) => {
    if (!codes || !isArray(codes) || !isArrayOfString(codes)) {
        return undefined;
    }
    return codes;
};
const parseDischarge = (discharge) => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error(`Incorrect or missing discharge data`);
    }
    return {
        date: parseDate(discharge.date, 'discharge date'),
        criteria: parseString(discharge.criteria, 'discharge criteria')
    };
};
const parseSickLeave = (sickLeave) => {
    if (!sickLeave || !isSickLeave(sickLeave)) {
        return undefined;
    }
    return {
        startDate: sickLeave.startDate,
        endDate: sickLeave.endDate,
    };
};
const parseHealthCheckRating = (rate) => {
    if (rate === undefined || !isHealthCheckRating(rate)) {
        throw new Error(`Incorrect or missing health check rating: ${rate}`);
    }
    return rate;
};
const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }) => {
    const entries = [];
    const newPatient = {
        name: parseString(name, 'name'),
        dateOfBirth: parseDate(dateOfBirth, 'date of birth'),
        ssn: parseString(ssn, 'SSN'),
        gender: parseGender(gender),
        occupation: parseString(occupation, 'occupation'),
        entries,
    };
    return newPatient;
};
exports.toNewPatient = toNewPatient;
const toNewHospitalEntry = (entry) => {
    return {
        type: 'Hospital',
        description: parseString(entry.description, 'description'),
        date: parseDate(entry.date, 'entry date'),
        specialist: parseString(entry.specialist, 'specialist\'s name'),
        diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
        discharge: parseDischarge(entry.discharge),
    };
};
const toNewOccupationalHealthcareEntry = (entry) => {
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
const toNewHealthCheckEntry = (entry) => {
    return {
        type: 'HealthCheck',
        description: parseString(entry.description, 'description'),
        date: parseDate(entry.date, 'entry date'),
        specialist: parseString(entry.specialist, 'specialist\'s name'),
        diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
    };
};
const toNewEntry = (entry) => {
    switch (entry.type) {
        case 'Hospital':
            return toNewHospitalEntry(entry);
        case 'OccupationalHealthcare':
            return toNewOccupationalHealthcareEntry(entry);
        case 'HealthCheck':
            return toNewHealthCheckEntry(entry);
        default:
            throw new Error(`Incorrect or missing entry type: ${entry.type}`);
    }
};
exports.toNewEntry = toNewEntry;
