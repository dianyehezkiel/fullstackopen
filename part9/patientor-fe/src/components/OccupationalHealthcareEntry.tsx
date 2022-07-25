import { Box, Typography } from "@material-ui/core";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { useStateValue } from "../state";
import { Entry } from "../types";

interface OccupationalHealthcareEntryProps {
  entry: Extract<Entry, {type: "OccupationalHealthcare"}>
}

const OccupationalHealthcareEntry = ({ entry }: OccupationalHealthcareEntryProps) => {
  const [{ diagnoses }] = useStateValue();

  const diagnosisCodeList = () => {
    if (!entry.diagnosisCodes) {
      return null;
    }

    return (
      <>
        <Typography>diagnoses:</Typography>
        <ul style={{ marginTop: "4px", marginBottom: "4px" }}>
          {entry.diagnosisCodes.map((code) => {
            return (
              <li key={code}>
                <Typography>{code} {diagnoses[code] ? diagnoses[code].name : null}</Typography>
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  const sickLeaveDate = () => {
    if (!entry.sickLeave) {
      return null;
    }

    return (
      <Typography>Sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</Typography>
    );
  };

  return (
    <Box style={{ border: "solid", borderRadius: "4px", marginBottom: "8px", padding: "8px" }}>
      <Typography>{entry.date} <MedicalInformationIcon /> {entry.employerName}</Typography>
      <Typography><i>{entry.description}</i></Typography>
      {diagnosisCodeList()}
      {sickLeaveDate()}
      <Typography>diagnosed by {entry.specialist}</Typography>
    </Box>
  );
};

export default OccupationalHealthcareEntry;