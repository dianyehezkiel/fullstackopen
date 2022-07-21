import { Box, Typography } from "@material-ui/core";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Entry } from "../types";
import { useStateValue } from "../state";

interface HealthCheckEntryProps {
  entry: Extract<Entry, {type: "HealthCheck"}>
}

const HealthCheckEntry = ({ entry }: HealthCheckEntryProps) => {
  const [{ diagnoses }] = useStateValue();

  const diagnosisCodeList = () => {
    if (!entry.diagnosisCodes) {
      return null;
    }

    return (
      <>
        diagnoses:
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

  const healthRateIcon = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return <FavoriteIcon color="error" />;
      case 1:
        return <FavoriteIcon color="warning" />;
      case 2:
        return <FavoriteIcon color="info" />;
      case 3:
        return <FavoriteIcon color="success" />;
      default:
        return null;
    }
  };

  return (
    <Box style={{ border: "solid", borderRadius: "4px", marginBottom: "8px", padding: "8px" }}>
      <Typography>{entry.date} <HealthAndSafetyIcon /></Typography>
      <Typography><i>{entry.description}</i></Typography>
      {healthRateIcon()}
      {diagnosisCodeList()}
      <Typography>diagnosed by {entry.specialist}</Typography>
    </Box>
  );
};

export default HealthCheckEntry;