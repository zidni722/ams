import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker
} from "./FormikFields";
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardTitle
} from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";

const SignupSchema = Yup.object().shape({
  state: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required()
    })
    .nullable()
    .required("State is required!")
});

const options = [
  { value: "laptop", label: "Laptop" },
  { value: "aksesoris", label: "Aksesoris"},
  { value: "lainnya", label: "Lainnya" }
];

class FormikPengadaan extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
      state: values.state.value
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  };

  render() {
    return (
      <div>
        <Row className="mb-4">
          <Colxx xxs="12">
                <Formik className="text-muted"
                  initialValues={{
                    state: {label: "Pilih Salah Satu", disabled: true }
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={this.handleSubmit}
                >
                  {({
                    handleSubmit,
                    setFieldValue,
                    setFieldTouched,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    isSubmitting
                  }) => (
                    <Form className="av-tooltip tooltip-label-bottom">
                      <FormGroup>
                        <Label>
                          <IntlMessages id="Kategori" />
                        </Label>
                        <FormikReactSelect
                          name="category"
                          id="category"
                          value={values.state}
                          options={options}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.state && touched.state ? (
                          <div className="invalid-feedback d-block">
                            {errors.state}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup>
                        <Label>
                          <IntlMessages id="Jenis Barang" />
                        </Label>
                        <FormikReactSelect
                          name="barang"
                          id="barang"
                          value={values.state}
                          options={options}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.state && touched.state ? (
                          <div className="invalid-feedback d-block">
                            {errors.state}
                          </div>
                        ) : null}
                      </FormGroup>
                      <Button color="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  )}
                </Formik>
          </Colxx>
        </Row>
      </div>
    );
  }
}
export default FormikPengadaan;
