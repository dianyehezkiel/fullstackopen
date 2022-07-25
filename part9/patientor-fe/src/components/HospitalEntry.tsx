import { Box, Typography } from "@material-ui/core";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import { useStateValue } from "../state";
import { Entry } from "../types";

interface HospitalEntryProps {
  entry: Extract<Entry, {type: "Hospital"}>
}

const HospitalEntry = ({ entry }: HospitalEntryProps) => {
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

  return (
    <Box style={{ border: "solid", borderRadius: "4px", marginBottom: "8px", padding: "8px" }}>
      <Typography>{entry.date} <LocalHospitalIcon /></Typography>
      <Typography><i>{entry.description}</i></Typography>
      {diagnosisCodeList()}
      <Typography>discharged on {entry.discharge.date}</Typography>
      <Typography>reason of discharge: {entry.discharge.criteria}</Typography>
      <Typography>diagnosed by {entry.specialist}</Typography>
    </Box>
  );
};

export default HospitalEntry;