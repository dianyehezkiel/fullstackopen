import { Box, Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { apiBaseUrl } from "../constants";
import { selectPatient, useStateValue } from "../state";
import { Entry, Patient, Gender } from "../types";
import EntryDetail from "../components/EntryDetail";

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

        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

        dispatch(selectPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void getPatient();
  });

  const genderIcon = (gender: Gender) => {
    switch (gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      case "other":
        return <TransgenderIcon />;
      default:
        return null;
    }
  };

  const entryList = (entries: Entry[]) => {
    if (!entries) {
      return null;
    }

    return (<>
      <Typography variant="h6" style={{marginTop: "16px", marginBottom: "8px"}}>
        Entries:
      </Typography>
      {entries.map((e) => {
        return <EntryDetail key={e.id} entry={e} />;
      })}
    </>
    );
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
    {entryList(selectedPatient.entries)}
  </Box>;
};

export default PatientDetail;