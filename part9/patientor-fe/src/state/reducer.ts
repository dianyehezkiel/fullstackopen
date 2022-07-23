import { State } from "./state";
import {Diagnose, Entry, Patient} from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SELECT_PATIENT";
      payload: Patient | undefined;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnose[];
    }
  | {
      type: "ADD_ENTRY";
      payload: Entry;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SELECT_PATIENT":
      return {
        ...state,
        selectedPatient: action.payload
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...state.diagnoses,
          ...action.payload.reduce(
            (memo, diagnose) => ({...memo, [diagnose.code]: diagnose}),
            {}
          )
        }
      };
    case "ADD_ENTRY":
      if (!state.selectedPatient) {
        return state;
      }
      return {
        ...state,
        selectedPatient: {
          ...state.selectedPatient,
          entries: [
              ...state.selectedPatient.entries,
              action.payload,
          ],
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const selectPatient = (patient: Patient): Action => {
  return {
    type: "SELECT_PATIENT",
    payload: patient,
  };
};

export const setDiagnoses = (diagnoses: Diagnose[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses,
  };
};

export const addEntry = (entry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: entry,
  };
};
