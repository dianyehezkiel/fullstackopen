import { Entry } from "../types";
import {useStateValue} from "../state";
import {Field, Form, Formik} from "formik";
import {DiagnosisSelection, TextField} from "../AddPatientModal/FormField";
import {Button, Grid, Typography} from "@material-ui/core";
import React from "react";

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
            validate={(values) => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.type) {
                    errors.name = requiredError;
                }
                if (!values.description) {
                    errors.name = requiredError;
                }
                if (!values.date) {
                    errors.name = requiredError;
                }
                if (!values.specialist) {
                    errors.name = requiredError;
                }
                if (values.type === "Hospital") {
                    if(!values.discharge.date) {
                        errors.name = requiredError;
                    }
                    if(!values.discharge.criteria) {
                        errors.name = requiredError;
                    }
                }
            }}
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