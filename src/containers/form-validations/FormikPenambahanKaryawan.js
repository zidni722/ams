import React, {Component} from "react";
import {reactLocalStorage} from 'reactjs-localstorage';

import {Form, Formik} from "formik";
import * as Yup from "yup";

import {Button, Card, CardBody, FormGroup, Label, Row} from "reactstrap";
import {Colxx} from "../../components/common/CustomBootstrap";
import {FormikReactSelect} from "./FormikFields";
import PhoneInput from 'react-phone-input-2'
import {NotificationManager} from "../../components/common/react-notifications";
import {apiClient} from "../../helpers/ApiService";
import IntlMessages from "../../helpers/IntlMessages";

const SignupSchema = Yup.object().shape({
    code: Yup.string()
        .required("NPK Harus diisi!"),
    firstName: Yup.string()
        .min(2, "Terlalu Pendek!")
        .max(50, "Terlalu Panjang!")
        .required("Nama Depan Harus diisi!"),
    lastName: Yup.string()
        .min(2, "Terlalu Pendek!")
        .max(50, "Terlalu Panjang!")
        .required("Nama Belakang Harus diisi!"),
    email: Yup.string()
        .email("Invalid email")
        .required("Alamat Email Harus diisi!"),
    division: Yup.object()
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
            name: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            code: "",
            photo: "",
            city_id: "",
            city: "",
            role_id: "",
            role: "",
            division_id: "",
            division: ""
        };

        this.onDrop = this.onDrop.bind(this);
    }

    componentDidMount() {
        apiClient.get('/roles')
            .then(res => {
                let dataRoles = [];
                const roles = res.data.data;
                for (const role of roles) {
                    dataRoles.push({value: role.id, label: role.name})
                }
                this.setState({dataRoles});
            }).catch((e) => {
            console.log(e.message)
        });

        apiClient.get('/divisions')
            .then(res => {
                let dataDivisions = [];
                const divisions = res.data.data;
                for (const division of divisions) {
                    dataDivisions.push({value: division.id, label: division.name})
                }
                this.setState({dataDivisions});
            }).catch((e) => {
            console.log(e.message)
        });

        apiClient.get('/cities')
            .then(res => {
                let dataCities = [];
                const cities = res.data.data;
                for (const city of cities) {
                    dataCities.push({value: city.id, label: city.name})
                }
                this.setState({dataCities});
            }).catch((e) => {
            console.log(e.message)
        })
    }

    onDrop(photo) {
        this.setState({
            photo: this.state.photo.concat(photo),
        });
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    handlerSubmit = async (event, values) => {
        event.preventDefault();

        apiClient.defaults.headers.common['Content-Type'] = 'application/json';

        const data = {
            "name": this.state.firstName + ' ' + this.state.lastName,
            "email": this.state.email,
            "phone": this.state.phone,
            "address": this.state.address,
            "code": this.state.code,
            "photo": "default.jpg",
            "city_id": reactLocalStorage.get('city'),
            "role_id": reactLocalStorage.get('role'),
            "division_id": reactLocalStorage.get('division')
        };

        apiClient.post('/users', data)
            .then(res => {
                if (res.status === 200) {
                    window.location.href = "./karyawan" // similar behavior as clicking on a link
                }

            }).catch((e) => {
                console.log(e.message)
        });
    };

    render() {
        return (
            <Row className="mb-4">
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <Formik
                                initialValues={this.state}
                                validationSchema={SignupSchema}
                                onSubmit={fields => {
                                    NotificationManager.success(
                                        "Karyawan berhasil ditambahkan",
                                        "Registrasi Berhasil",
                                        3000,
                                        null,
                                        null,
                                        +JSON.stringify(fields, null, 4)
                                    );
                                    this.handlerSubmit.bind(this, fields)
                                }}>
                                {({
                                      handleSubmit,
                                      handleOnChange,
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
                                            <input
                                                onChange={this.handleChange}
                                                className="form-control"
                                                name="code"
                                            />
                                            {errors.code && touched.code ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.code}
                                                </div>
                                            ) : null}
                                        </FormGroup>

                                        <FormGroup className="error-l-100">
                                            <Label>Nama Depan</Label>
                                            <input onChange={this.handleChange} className="form-control" name="firstName"/>
                                            {errors.firstName && touched.firstName ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.firstName}
                                                </div>
                                            ) : null}
                                        </FormGroup>

                                        <FormGroup className="error-l-100">
                                            <Label>Nama Belakang</Label>
                                            <input onChange={this.handleChange} className="form-control" name="lastName"/>
                                            {errors.lastName && touched.lastName ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.lastName}
                                                </div>
                                            ) : null}
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>Email</Label>
                                            <input
                                                onChange={this.handleChange}
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
                                                name="division"
                                                id="division"
                                                value={values.division}
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
                                            <Label>Nomor Telepon</Label>
                                            <PhoneInput
                                                className="form-control"
                                                name="phone"
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
                                                value={this.state.phone}
                                                onChange={phone => this.setState({phone})}
                                            />
                                        </FormGroup>

                                        <FormGroup className="error-l-50">
                                            <Label>City</Label>
                                            <FormikReactSelect
                                                name="city"
                                                id="city"
                                                value={values.city}
                                                isMulti={false}
                                                options={this.state.dataCities}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                            {errors.city && touched.city ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.city}
                                                </div>
                                            ) : null}
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>Alamat</Label>
                                            <input
                                                onChange={this.handleChange}
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
                                            <Button
                                                color="primary"
                                                className={`btn-shadow btn-multiple-state ${this.props.loading ? "show-spinner" : ""}`}
                                                size="lg"
                                            >
                                                <span className="spinner d-inline-block">
                                                  <span className="bounce1"/>
                                                  <span className="bounce2"/>
                                                  <span className="bounce3"/>
                                                </span>
                                                <span className="label"><IntlMessages id="user.login-button"/></span>
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
