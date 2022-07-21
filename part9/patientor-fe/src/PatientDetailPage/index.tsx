import { Box, Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { apiBaseUrl } from "../constants";
import { selectPatient, useStateValue } from "../state";
import { Entry, Patient } from "../types";

const PatientDetail = () => {
  const [{ selectedPatient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const getPatient = async () => {
      if (!id) {
        throw new Error("No id provided");
      }

      try {
        if (selectedPatient && id === selectedPatient.id) {
          return;
        }
        
        const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

        dispatch(selectPatient(patient));
        return;
      } catch (e) {
        console.error(e);
      }
    };
    void getPatient();
  });

  const genderIcon = (gender: string) => {
    if (gender === 'male') {
      return <MaleIcon />;
    }
    if (gender === 'female') {
      return <FemaleIcon />;
    }
    return <TransgenderIcon />;
  };

  const diagnosisCodeList = (diagnosisCodes?: string[]) => {
    if (!diagnosisCodes) {
      return null;
    }

    return (
      <ul style={{ marginTop: "4px", marginBottom: "4px" }}>
        {diagnosisCodes.map((code) => {
          return (
            <li key={code}>{code}</li>
          );
        })}
      </ul>
    );
  };

  const entryList = (entries: Entry[]) => {
    return entries.map((entry) => {
      return (
        <Box key={entry.id} style={{ marginBottom: "8px" }}>
          <Typography>
            <i>{entry.date}</i> | {entry.description}
          </Typography>
          <Typography>
            {diagnosisCodeList(entry.diagnosisCodes)}
          </Typography>
        </Box>
      );
    });
  };

  if (!selectedPatient) {
    return <Typography variant="h6" style={{marginTop: "16px", marginBottom: "16px"}}>
      Patient does not exist!
    </Typography>;
  }

  return <Box>
    <Typography variant="h5" style={{marginTop: "24px", marginBottom: "8px"}}>
      {selectedPatient.name} {genderIcon(selectedPatient.gender)}
    </Typography>
    <Typography>SSN: {selectedPatient.ssn}</Typography>
    <Typography>Occupation: {selectedPatient.occupation}</Typography>
    <Typography variant="h6" style={{marginTop: "16px", marginBottom: "8px"}}>
      Entries:
    </Typography>
    {entryList(selectedPatient.entries)}
  </Box>;
};

export default PatientDetail;