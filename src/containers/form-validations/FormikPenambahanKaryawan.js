import React, { Component } from "react";
import { reactLocalStorage } from 'reactjs-localstorage';

import { Form, Formik } from "formik";

import { Button, Card, CardBody, FormGroup, Label, Row } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import { NotificationManager } from "../../components/common/react-notifications";
import { apiClient } from "../../helpers/ApiService";
import InputMask from "react-input-mask";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";


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
            province_id:"",
            province:"",
            city_id: "",
            city: "",
            role_id: "",
            role: "",
            division_id: "",
            division: "",
            isCityDisable: true
        };

        this.onDrop = this.onDrop.bind(this);
    }

    componentDidMount() {
        apiClient.get('/roles')
            .then(res => {
                let dataRoles = [];
                const roles = res.data.data;
                for (const role of roles) {
                    dataRoles.push({ value: role.id, label: role.name })
                }
                this.setState({ dataRoles });
            }).catch((e) => {
                console.log(e.message)
            });

        apiClient.get('/divisions')
            .then(res => {
                let dataDivisions = [];
                const divisions = res.data.data;
                for (const division of divisions) {
                    dataDivisions.push({ value: division.id, label: division.name })
                }
                this.setState({ dataDivisions });
            }).catch((e) => {
                console.log(e.message)
            });
        apiClient.get('/provinces?per_page=50')
            .then(res => {
                let dataProvinces = [];
                const provinces = res.data.data;
                for (const province of provinces) {
                    dataProvinces.push({ value: province.id, label: province.name })
                }
                this.setState({ dataProvinces });
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
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handlerSelectChange = (e, action) => {
        const { value } = e;
        const name = action
        this.setState({ [name]: value });
        reactLocalStorage.set(name, value);

        if (action === 'province') {
            apiClient.get(`/cities?per_page=100&province_id=${value}`)
            .then(res => {
                let dataCities = [];
                const cities = res.data.data;
                for (const city of cities) {
                    dataCities.push({ value: city.id, label: city.name })
                }
                this.setState({ dataCities });
            }).catch((e) => {
                console.log(e.message)
            })
            this.setState({ isCityDisable: false });
        }
    };

    handlerSubmit = async (event, values) => {
        event.preventDefault();

        if (this.state.code.length > 0) {
            this.setState({ isValid: true })
        } else if (this.state.code.length === 0) {
            this.setState({ isValid: false })
        }

        if (this.state.name.length > 0) {
            this.setState({ isValid: true })
        } else if (this.state.name.length === 0) {
            this.setState({ isValid: false })
        }

        if (this.state.email.length > 0) {
            this.setState({ isValid: true })
        } else if (this.state.email.length === 0) {
            this.setState({ isValid: false })
        }

        if (this.state.address.length > 0) {
            this.setState({ isValid: true })
        } else if (this.state.address.length === 0) {
            this.setState({ isValid: false })
        }

        if (this.state.city.length > 0) {
            this.setState({ isValid: true })
        } else if (this.state.city.length === 0) {
            this.setState({ isValid: false })
        }

        if (this.state.role.length > 0) {
            this.setState({ isValid: true })
        } else if (this.state.role.length === 0) {
            this.setState({ isValid: false })
        }

        if (this.state.division.length > 0) {
            this.setState({ isValid: true })
        } else if (this.state.division.length === 0) {
            this.setState({ isValid: false })
        }

        apiClient.defaults.headers.common['Content-Type'] = 'application/json';

        const data = {
            "code": this.state.code,
            "name": this.state.name,
            "email": this.state.email,
            "phone": parseInt(this.state.phone),
            "address": this.state.address,
            "city_id": reactLocalStorage.get('city'),
            "role_id": reactLocalStorage.get('role'),
            "division_id": reactLocalStorage.get('division')
        };

        apiClient.post('/users', data)
            .then(res => {
                if (res.status === 201) {
                    window.location.href = "./karyawan" // similar behavior as clicking on a link
                    reactLocalStorage.set('isSuccesSubmit', true)
                }
            }).catch((e) => {
                console.log(e.message)
                NotificationManager.error(
                    "Silahkan coba kembali beberapa saat lagi!",
                    "Terjadi Kesalahan",
                    5000,
                    () => {
                        this.setState({ visible: false });
                    },
                    null
                );
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
                                    setFieldTouched,
                                    errors,
                                    touched,
                                    isSubmitting
                                }) => (
                                        <Form onSubmit={this.handlerSubmit} className="av-tooltip tooltip-label-right">
                                            <FormGroup className="error-l-50">
                                                <Label>NPK</Label>
                                                <InputMask
                                                    className="form-control"
                                                    name="code"
                                                    mask="aa-99"
                                                    onChange={this.handleChange}
                                                />
                                                {this.state.isValid === false ? (
                                                    <span className="invalid-feedback d-block">
                                                        Wajib di isi!
                                                    </span>
                                                ) : (
                                                        ""
                                                    )}
                                            </FormGroup>

                                            <FormGroup className="error-l-100">
                                                <Label>Nama Lengkap</Label>
                                                <input
                                                    className="form-control"
                                                    name="name"
                                                    onChange={this.handleChange}
                                                />
                                                {this.state.isValid === false ? (
                                                    <span className="invalid-feedback d-block">
                                                        Wajib di isi!
                                                    </span>
                                                ) : (
                                                        ""
                                                    )}
                                            </FormGroup>

                                            <FormGroup>
                                                <Label>Email</Label>
                                                <input
                                                    className="form-control"
                                                    name="email"
                                                    type="email"
                                                    onChange={this.handleChange}
                                                />
                                                {this.state.isValid === false ? (
                                                    <span className="invalid-feedback d-block">
                                                        Wajib di isi!
                                                    </span>
                                                ) : (
                                                        ""
                                                    )}
                                            </FormGroup>

                                            <FormGroup className="error-l-50">
                                                <Label>Role</Label>
                                                <Select
                                                    name="role"
                                                    id="role"
                                                    options={this.state.dataRoles}
                                                    onChange={e => this.handlerSelectChange(e, 'role')}
                                                    onBlur={setFieldTouched}
                                                />
                                                {this.state.isValid === false ? (
                                                    <span className="invalid-feedback d-block">
                                                        Wajib di isi!
                                                    </span>
                                                ) : (
                                                        ""
                                                    )}
                                            </FormGroup>

                                            <FormGroup className="error-l-50">
                                                <Label>Divisi</Label>
                                                <Select
                                                    name="division"
                                                    id="division"
                                                    options={this.state.dataDivisions}
                                                    onChange={e => this.handlerSelectChange(e, 'division')}
                                                    onBlur={setFieldTouched}
                                                />
                                                {this.state.isValid === false ? (
                                                    <span className="invalid-feedback d-block">
                                                        Wajib di isi!
                                                    </span>
                                                ) : (
                                                        ""
                                                    )}
                                            </FormGroup>

                                            <FormGroup className="error-l-100">
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
                                                    onChange={phone => this.setState({ phone })}
                                                />
                                                {this.state.isValid === false ? (
                                                    <span className="invalid-feedback d-block">
                                                        Wajib di isi!
                                                    </span>
                                                ) : (
                                                        ""
                                                    )}
                                            </FormGroup>

                                            <FormGroup className="error-l-50">
                                                <Label>Provinsi</Label>
                                                <Select
                                                    name="province"
                                                    id="province"
                                                    options={this.state.dataProvinces}
                                                    onChange={e => this.handlerSelectChange(e, 'province')}
                                                    onBlur={setFieldTouched}
                                                />
                                                {this.state.isValid === false ? (
                                                    <span className="invalid-feedback d-block">
                                                        Wajib di isi!
                                                    </span>
                                                ) : (
                                                        ""
                                                    )}
                                            </FormGroup>

                                            <FormGroup className="error-l-50">
                                                <Label>Kota</Label>
                                                <Select
                                                    name="city"
                                                    id="city"
                                                    options={this.state.dataCities}
                                                    onChange={e => this.handlerSelectChange(e, 'city')}
                                                    onBlur={setFieldTouched}
                                                    isDisabled={this.state.isCityDisable}
                                                />
                                                {this.state.isValid === false ? (
                                                    <span className="invalid-feedback d-block">
                                                        Wajib di isi!
                                                    </span>
                                                ) : (
                                                        ""
                                                    )}
                                            </FormGroup>

                                            <FormGroup>
                                                <Label>Alamat</Label>
                                                <input
                                                    className="form-control"
                                                    name="address"
                                                    component="textarea"
                                                    onChange={this.handleChange}
                                                />
                                                {this.state.isValid === false ? (
                                                    <span className="invalid-feedback d-block">
                                                        Wajib di isi!
                                                    </span>
                                                ) : (
                                                        ""
                                                    )}
                                            </FormGroup>

                                            <div className="d-flex justify-content-between align-items-center"><p />
                                                <Button
                                                    color="primary"
                                                    className={`btn-shadow btn-multiple-state ${this.props.loading ? "show-spinner" : ""}`}
                                                    size="lg"
                                                >
                                                    <span className="spinner d-inline-block">
                                                        <span className="bounce1" />
                                                        <span className="bounce2" />
                                                        <span className="bounce3" />
                                                    </span>
                                                    <span className="label">Submit</span>
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
