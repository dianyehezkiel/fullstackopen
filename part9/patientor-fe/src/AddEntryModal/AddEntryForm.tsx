import { Entry, HealthCheckRating } from "../types";
import { useStateValue } from "../state";
import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, EntryTypeOption, HealthCheckRatingOption, SelectField, TextField } from "../AddPatientModal/FormField";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import * as Yup from 'yup';

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryFormValues = UnionOmit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
  { value: "HealthCheck", label: "Health Check" }
];

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: undefined,
        discharge: {
          date: "",
          criteria: "",
        },
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        },
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={onSubmit}
      validationSchema={
        Yup.object().shape({
          description: Yup.string().required('Description is required'),
          date: Yup.string()
            .required('Entry date is required')
            .matches(
              /(?:19\d{2}|20\d{2})-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])\b/,
              'Please use YYYY-MM-DD format'
            ),
          specialist: Yup.string().required('Specialist name is required'),
          discharge: Yup.object().when('type', {
            is: (val: string) => val === 'Hospital',
            then: Yup.object().shape({
              date: Yup.string()
                .required('Discharge date is required')
                .matches(
                  /(?:19\d{2}|20\d{2})-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])\b/,
                  'Please use YYYY-MM-DD format'
                ),
              criteria: Yup.string().required('Discharge criteria is required'),
            }),
            otherwise: Yup.object().shape({
              date: Yup.string().nullable(),
              criteria: Yup.string().nullable(),
            }),
          }),
          employerName: Yup.string().when('type', {
            is: (val: string) => val === 'OccupationalHealthcare',
            then: Yup.string().required('Employer name is required'),
            otherwise: Yup.string().nullable(),
          }),
          sickLeave: Yup.object().when('type', {
            is: (val: string) => val === 'OccupationalHealthcare',
            then: Yup.object().shape({
              startDate: Yup.string().when('endDate', {
                is: (val: string) => Boolean(val),
                then: Yup.string()
                  .required('Sick leave start date is required')
                  .matches(
                    /(?:19\d{2}|20\d{2})-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])\b/,
                    'Please use YYYY-MM-DD format'
                  ),
                otherwise: Yup.string().nullable(),
              }),
              endDate: Yup.string().when('startDate', {
                is: (val: string) => Boolean(val),
                then: Yup.string()
                  .required('Sick leave end date is required')
                  .matches(
                    /(?:19\d{2}|20\d{2})-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])\b/,
                    'Please use YYYY-MM-DD format'
                  ),
                otherwise: Yup.string().nullable(),
              }),
            }, [['startDate', 'endDate']]),
            otherwise: Yup.object().shape({
              startDate: Yup.string().nullable(),
              endDate: Yup.string().nullable(),
            }),
          }),
          healthCheckRating: Yup.number().when('type', {
            is: (val: string) => val === 'HealthCheck',
            then: Yup.number().min(0).required('Health Rating is required'),
            otherwise: Yup.number().nullable(),
          }),
        })
      }
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        const showIfHospitalType = () => {
          if (values.type === "Hospital") {
            return {
              "display": "block",
            };
          }
          return {
            "display": "none",
          };
        };
        const showIfOccupationalType = () => {
          if (values.type === "OccupationalHealthcare") {
            return {
              "display": "block",
            };
          }
          return {
            "display": "none",
          };
        };
        const showIfHealthCheckType = () => {
          if (values.type === "HealthCheck") {
            return {
              "display": "block",
            };
          }
          return {
            "display": "none",
          };
        };

        return (
          <Form className="form ui">
            <Typography variant="button">General Information</Typography>
            <SelectField label="Type" name="type" options={entryTypeOptions} />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Entry Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist Name"
              placeholder="Specialist Name"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Typography variant="button">Detail Information</Typography>
            <Box style={showIfHospitalType()}>
              <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
              />
              <Field
                label="Discharge Criteria"
                placeholder="Discharge Criteria"
                name="discharge.criteria"
                component={TextField}
              />
            </Box>
            <Box style={showIfOccupationalType()}>
              <Field
                label="Employer Name"
                placeholder="Employer Name"
                name="employerName"
                component={TextField}
              />
              <Field
              label="Sick Leave Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
              />
              <Field
              label="Sick Leave End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
              />
            </Box>
            <Box style={showIfHealthCheckType()}>
              <SelectField label="Health Rating" name="healthCheckRating" options={healthCheckRatingOptions} />
            </Box>
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
