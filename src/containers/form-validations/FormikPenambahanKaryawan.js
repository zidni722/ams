import React, { Component } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import { FormikReactSelect } from "./FormikFields";
import PhoneInput from 'react-phone-input-2'
import { NotificationManager } from "../../components/common/react-notifications";
import { servicePath, token } from "../../constants/defaultValues";

import Axios from "axios";

const apiUrl = servicePath;

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
    .required("NoTlpn Harus diisi!"),
  address: Yup.string()
    .min(10, "Terlalu Pendek!")
    .required("Alamat Harus diisi!"),
  role: Yup.object()
  .shape({
    label: Yup.string().required(),
    value: Yup.string().required()
  })
  .nullable()
  .required("Role harus diisi!")
});

class FormikPenambahanKaryawan extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      pictures: [],
      divisions: [],
      roles: [],
      access_token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXVpZCI6IjU2NzkyZTFjLTc3MDEtNDdjZC1iMzdkLTg1Y2VjMzI3MjkyZCIsIm5hbWUiOiJCaXlhbiIsImVtYWlsIjoiYml5YW4uYmVsaW5kYUBwYXdvb24uY29tIiwicm9sZV9pZCI6MSwiZGl2aXNpb25faWQiOjQsInN0YXR1cyI6MCwiaWF0IjoxNTk2OTQ1NjUxfQ.GRw5DCBxkbtZt9VcTDcA9_KWAXqw23Xav17AC3BdKTg'
    };
    this.onDrop = this.onDrop.bind(this);
  }
  componentDidMount() {
    Axios.get(
      `${apiUrl}/roles`,
    {
      headers : {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        let dataRoles = []
        const roles = res.data.data;
        for(const role of roles) {
          dataRoles.push({value:role.id, label:role.name})
        }
        this.setState( {dataRoles} );
      })
  
      Axios.get(
        `${apiUrl}/divisions`,
      {
        headers : {
          Authorization: 'Bearer ' + token
        }
      })
        .then(res => {
          let dataDivisions = []
          const divisions = res.data.data;
          for(const division of divisions) {
            dataDivisions.push({value:division.id, label:division.name})
          }
          this.setState( {dataDivisions} );
        })
  }
  onDrop(picture) {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    });
  }

  handleChange = (e) =>{
    const{name,value} = e.target
    this.setState({ [name]: value })
    console.log(value)
  }

  handlerSubmit = async (event,values) => {
    event.preventDefault();
    console.log(values)

    await Axios.post(`${apiUrl}/users`, this.state, {
      headers : {
        Authorization: 'Bearer ' + token
    }
  })
    this.props.history.push('/karyawan')
  }

  render() {
    return (
      <Row className="mb-4">
        <Colxx xxs="12">
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
                  this.handlerSubmit.bind(this,fields)
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
                  <Form onSubmit={this.handlerSubmit} className="av-tooltip tooltip-label-right">
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
                      <Label>Role</Label>
                      <FormikReactSelect
                        name="role"
                        id="role"
                        value={values.role}
                        isMulti={false}
                        options={this.state.dataRoles}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.role && touched.role ? (
                        <div className="invalid-feedback d-block">
                          {errors.role}
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
                        options={this.state.dataDivisions}
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
                        validate={{
                          number: {
                            value: true,
                            errorMessage: "Value must be a number"
                          },
                          required: {
                            value: true,
                            errorMessage: "Please enter a number"
                          }
                        }}
                      />
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