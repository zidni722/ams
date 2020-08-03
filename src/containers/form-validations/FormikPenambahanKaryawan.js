import React, { Component } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import { FormikReactSelect } from "./FormikFields";
import ImageUpload from "./UploadImg";
import PhoneInput from 'react-phone-input-2'
import { NotificationManager } from "../../components/common/react-notifications";


const SignupSchema = Yup.object().shape({
  npk: Yup.string()
    .min(4, "Terlalu Pendek!")
    .max(4, "Terlalu Panjang!")
    .required("NPK Harus diisi!"),
  firstName: Yup.string()
    .min(2, "Terlalu Pendek!")
    .max(50, "Terlalu Panjang!")
    .required("Nama Depan Harus diisi!"),
  lastName: Yup.string()
    .min(2, "Terlalu Pendek!")
    .max(50, "Terlalu Panjang!")
    .required("Nama Belakang Harus diisi!"),
  password: Yup.string().required("Password Harus diisi!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords harus sama!')
    .required('Confirm Password Harus diisi!'),
  email: Yup.string()
    .email("Invalid email")
    .required("Alamat Email Harus diisi!"),
  divisi: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required()
    })
    .nullable()
    .required("Divisi harus diisi!"),
  phone: Yup.string()
    .min(10, "Terlalu Pendek!")
    .max(13, "Terlalu Panjang!")
    .required("NoTlpn Harus diisi!"),
  address: Yup.string()
    .min(10, "Terlalu Pendek!")
    .max(30, "Terlalu Panjang!")
    .required("Alamat Harus diisi!"),
  role: Yup.object()
  .shape({
    label: Yup.string().required(),
    value: Yup.string().required()
  })
  .nullable()
  .required("Role harus diisi!")
});
const selectRole = [
  { label: "Human Resource", value: "hr"},
  { label: "Manager Departement", value: "manager"},
  { label: "Karyawan", value: "karyawan" }
];
const selectDivisi = [
  { label: "Human Resource", value: "hr"},
  { label: "Quality Asurance", value: "qa"},
  { label: "Developer", value: "dev" }
];

class FormikPenambahanKaryawan extends Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onDrop(picture) {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    });
  }
  handleSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
      role: values.role.value
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  };

  render() {
    return (
      <Row className="mb-4">
        <Colxx xxs="12">
        <Colxx xxs="12" lg="5" xl="4" className="mb-5"><br/><br/>
        </Colxx>
          <Card>
            <CardBody>
              
              <Formik
                initialValues={{
                  npk:"",
                  firstName: "",
                  lastName: "",
                  password:"",
                  confirmPassword:"",
                  email: "",
                  divisi: [],
                  phone:"",
                  address:"",
                  role: [],
                  picture:[]

                }}
                validationSchema={SignupSchema}
                onSubmit={fields => {
                  NotificationManager.success(
                    "Karyawan berhasil ditambahkan",
                    "Registrasi Berhasil",
                    3000,
                    null,
                    null,
                    + JSON.stringify(fields, null, 4)
                  );
              }}>
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  setFieldTouched,
                  values,
                  errors,
                  touched,
                  isSubmitting
                }) => (
                  <Form className="av-tooltip tooltip-label-right">
                    <FormGroup className="img-thumbnail card-img social-profile-img">
                      <ImageUpload 
                          name="picture"
                          id="picture"   
                      />
                    </FormGroup><br/><br/>

                    <FormGroup className="error-l-50">
                      <Label>NPK</Label>
                      <Field 
                        className="form-control" 
                        name="npk"
                        type="number" 
                      />
                      {errors.npk && touched.npk ? (
                        <div className="invalid-feedback d-block">
                          {errors.npk}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="error-l-100">
                      <Label>Nama Depan</Label>
                      <Field className="form-control" name="firstName" />
                      {errors.firstName && touched.firstName ? (
                        <div className="invalid-feedback d-block">
                          {errors.firstName}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="error-l-100">
                      <Label>Nama Belakang</Label>
                      <Field className="form-control" name="lastName" />
                      {errors.lastName && touched.lastName ? (
                        <div className="invalid-feedback d-block">
                          {errors.lastName}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="error-l-75">
                        <Label>Password</Label>
                        <Field
                          className="form-control"
                          name="password"
                          type="password"
                        />
                        {errors.password && touched.password ? (
                          <div className="invalid-feedback d-block">
                            {errors.password}
                          </div>
                        ) : null}
                    </FormGroup>
                    
                    <FormGroup className="error-l-125">
                      <Label>Confirm Password</Label>                      
                      <Field
                        className="form-control" 
                        name="confirmPassword" 
                        type="password"
                      /> 
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <div className="invalid-feedback d-block">
                          {errors.confirmPassword}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
                      <Label>Email</Label>
                      <Field
                        className="form-control"
                        name="email"
                        type="email"
                      />
                      {errors.email && touched.email ? (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      ) : null}
                    </FormGroup>
                    

                    <FormGroup className="error-l-50">
                      <Label>Divisi</Label>
                      <FormikReactSelect
                        name="divisi"
                        id="divisi"
                        value={values.divisi}
                        isMulti={false}
                        options={selectDivisi}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.divisi && touched.divisi ? (
                        <div className="invalid-feedback d-block">
                          {errors.divisi}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="error-l-50">
                      <Label>NoTlpn</Label>
                      <PhoneInput 
                        className="form-control" 
                        name="noTlpn"
                        country='id'
                      />
                      {errors.phone && touched.phone ? (
                        <div className="invalid-feedback d-block">
                          {errors.phone}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
                      <Label>Alamat</Label>
                      <Field
                        className="form-control"
                        name="address"
                        component="textarea"
                      />
                      {errors.address && touched.address ? (
                        <div className="invalid-feedback d-block">
                          {errors.address}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="error-l-50">
                      <Label>Role</Label>
                      <FormikReactSelect
                        name="role"
                        id="role"
                        value={values.role}
                        isMulti={false}
                        options={selectRole}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.role && touched.role ? (
                        <div className="invalid-feedback d-block">
                          {errors.role}
                        </div>
                      ) : null}
                    </FormGroup>
                    
                    <div className="d-flex justify-content-between align-items-center"><p/>
                      <Button color="primary" type="submit">
                        Submit
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    );
  }
}

export default FormikPenambahanKaryawan;
