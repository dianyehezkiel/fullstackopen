import { Entry } from "../types";
import {useStateValue} from "../state";
import {Field, Form, Formik} from "formik";
import {DiagnosisSelection, TextField} from "../AddPatientModal/FormField";
import {Button, Grid, Typography} from "@material-ui/core";
import * as Yup from 'yup';

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryFormValues = UnionOmit<Entry, 'id'>;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: "Hospital",
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                discharge: {
                    date: "",
                    criteria: "",
                },
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
                discharge: Yup.object().shape({
                  date: Yup.string()
                    .required('Discharge date is required')
                    .matches(
                      /(?:19\d{2}|20\d{2})-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])\b/,
                      'Please use YYYY-MM-DD format'
                    ),
                  criteria: Yup.string().required('Discharge criteria is required'),
                })
              })
            }
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Typography variant="h5">Hospital Entry</Typography>
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={ TextField }
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