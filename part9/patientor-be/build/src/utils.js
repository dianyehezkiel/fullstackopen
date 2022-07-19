"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const parseString = (text, dataName) => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing ${dataName}`);
    }
    return text;
};
const parseDob = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date of birth: ${date}`);
    }
    return date;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};
const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }) => {
    const newPatient = {
        name: parseString(name, 'name'),
        dateOfBirth: parseDob(dateOfBirth),
        ssn: parseString(ssn, 'SSN'),
        gender: parseGender(gender),
        occupation: parseString(occupation, 'occupation'),
    };
    return newPatient;
};
exports.default = toNewPatient;
