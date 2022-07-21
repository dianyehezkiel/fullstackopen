import { Box, Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";

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
        if (!patient) {
          dispatch({ type: "SELECT_PATIENT", payload: undefined });
        }
  
        dispatch({ type: "SELECT_PATIENT", payload: patient });
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

  if (!selectedPatient) {
    return <p>{`Patient doesn't exist`}</p>;
  }

  return <Box>
    <Typography variant="h5" style={{marginTop: "16px", marginBottom: "16px"}}>
      {selectedPatient.name} {genderIcon(selectedPatient.gender)}
    </Typography>
    <Typography>SSN: {selectedPatient.ssn}</Typography>
    <Typography>Occupation: {selectedPatient.occupation}</Typography>
  </Box>;
};

export default PatientDetail;