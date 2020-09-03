import React, { Component } from "react";
import { reactLocalStorage } from 'reactjs-localstorage';

import { Form, Formik } from "formik";

import { Button, Card, CardBody, FormGroup, Label, Row } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import PhoneInput from 'react-phone-input-2'
import { apiClient } from "../../helpers/ApiService";
import Select from 'react-select'
import { NotificationManager } from "../../components/common/react-notifications";
import { me } from "../../constants/defaultValues";


class FormikEditKaryawan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailUser: '',
            isLoading: false
        };
        this.onDrop = this.onDrop.bind(this);
    }

    componentDidMount() {
        apiClient.get('/roles')
            .then((res) => {
                let dataRoles = [];
                const roles = res.data.data;
                for (const role of roles) {
                    dataRoles.push({ value: role.id, label: role.name })
                }

                setTimeout(() => {
                    this.setState({ dataRoles })
                    this.setState({ isLoading: true })
                }, 100);
            }).catch((e) => {
                console.log(e.message)
            });

        apiClient.get('/divisions')
            .then((res) => {
                let dataDivisions = [];
                const divisions = res.data.data;
                for (const division of divisions) {
                    dataDivisions.push({ value: division.id, label: division.name })
                }
                this.setState({ dataDivisions });
            }).catch((e) => {
                console.log(e.message)
            });

        apiClient.get('/cities')
            .then((res) => {
                let dataCities = [];
                const cities = res.data.data;
                for (const city of cities) {
                    dataCities.push({ value: city.id, label: city.name })
                }
                this.setState({ dataCities });
            }).catch((e) => {
                console.log(e.message)
            })

        const userID = uri => uri.substring(uri.lastIndexOf('/') + 1);

        apiClient.get('/users/' + userID(window.location.href))
            .then(async (res) => {
                await this.setState({ detailUser: res.data.data })

                await this.setState({ code: this.state.detailUser.code })
                await this.setState({ name: this.state.detailUser.name })
                await this.setState({ email: this.state.detailUser.email })
                await this.setState({ role: this.state.detailUser.role_id })
                await this.setState({ division: this.state.detailUser.division_id })
                await this.setState({ city: this.state.detailUser.city_id })
                await this.setState({ phone: this.state.detailUser.phone })
                await this.setState({ address: this.state.detailUser.address })

                await reactLocalStorage.set('defaultRoleValue_editKaryawan', this.state.detailUser.role_id);
                await reactLocalStorage.set('defaultRoleLabel_editKaryawan', this.state.detailUser.role_name);
                await reactLocalStorage.set('defaultDivisionValue_editKaryawan', this.state.detailUser.division_id);
                await reactLocalStorage.set('defaultDivisionLabel_editKaryawan', this.state.detailUser.division_name);
                await reactLocalStorage.set('defaultCityValue_editKaryawan', this.state.detailUser.city_id);
                await reactLocalStorage.set('defaultCityLabel_editKaryawan', this.state.detailUser.city_name);
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
    };

    handlerSubmit = async (event, values) => {
        event.preventDefault();

        apiClient.defaults.headers.common['Content-Type'] = 'application/json';

        const formData = new FormData();

        formData.append('code', this.state.code)
        formData.append('name', this.state.name)
        formData.append('email', this.state.email)
        formData.append('phone', this.state.phone)
        formData.append('address', this.state.address)
        formData.append('code', this.state.code)
        formData.append('city_id', this.state.city)
        formData.append('role_id', this.state.role)
        formData.append('division_id', this.state.division)

        apiClient.put('/users/' + this.state.detailUser.id, formData)
            .then(res => {
                if (res.status === 200) {
                    apiClient.get('/users/' + this.state.detailUser.id)
                        .then(res => {
                            if (res.status === 200) {
                                if (me.id === this.state.detailUser.id) {
                                    const newMe = res.data.data
                                    newMe.token = me.token

                                    reactLocalStorage.remove('me')
                                    reactLocalStorage.setObject('me', newMe)
                                }
                                window.location.href = "../detail-karyawan/" + this.state.detailUser.id
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
        return !this.state.isLoading ? (
            <div className="loading" />
        ) : (
                <Row className="mb-4">
                    <Colxx xxs="12">
                        <Card>
                            <CardBody>
                                <Formik enableReinitialize={true}
                                >
                                    {({
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
                                                        className="form-control"
                                                        name="code"
                                                        defaultValue={this.state.detailUser.code}
                                                        onChange={this.handleChange}
                                                    />
                                                </FormGroup>

                                                <FormGroup className="error-l-100">
                                                    <Label>Nama Lengkap</Label>
                                                    <input
                                                        className="form-control"
                                                        name="name"
                                                        defaultValue={this.state.detailUser.name}
                                                        onChange={this.handleChange}
                                                    />
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label>Email</Label>
                                                    <input
                                                        className="form-control"
                                                        name="email"
                                                        type="email"
                                                        defaultValue={this.state.detailUser.email}
                                                        onChange={this.handleChange}
                                                    />
                                                </FormGroup>

                                                <FormGroup className="error-l-50">
                                                    <Label>Role</Label>
                                                    <Select
                                                        name="role"
                                                        id="role"
                                                        defaultValue={{ value: reactLocalStorage.get('defaultRoleValue_editKaryawan'), label: reactLocalStorage.get('defaultRoleLabel_editKaryawan') }}
                                                        options={this.state.dataRoles}
                                                        onChange={e => this.handlerSelectChange(e, 'role')}
                                                        onBlur={setFieldTouched}
                                                    />
                                                </FormGroup>

                                                <FormGroup className="error-l-50">
                                                    <Label>Divisi</Label>
                                                    <Select
                                                        name="division"
                                                        id="division"
                                                        defaultValue={{ value: reactLocalStorage.get('defaultDivisionValue_editKaryawan'), label: reactLocalStorage.get('defaultDivisionLabel_editKaryawan') }}
                                                        options={this.state.dataDivisions}
                                                        onChange={e => this.handlerSelectChange(e, 'division')}
                                                        onBlur={setFieldTouched}
                                                    />
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
                                                        value={this.state.detailUser.phone}
                                                        onChange={phone => this.setState({ phone })}
                                                    />
                                                </FormGroup>

                                                <FormGroup className="error-l-50">
                                                    <Label>City</Label>
                                                    <Select
                                                        name="city"
                                                        id="city"
                                                        defaultValue={{ value: reactLocalStorage.get('defaultCityValue_editKaryawan'), label: reactLocalStorage.get('defaultCityLabel_editKaryawan') }}
                                                        options={this.state.dataCities}
                                                        onChange={e => this.handlerSelectChange(e, 'city')}
                                                        onBlur={setFieldTouched}
                                                    />
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label>Alamat</Label>
                                                    <input
                                                        onChange={this.handleChange}
                                                        className="form-control"
                                                        name="address"
                                                        component="textarea"
                                                        defaultValue={this.state.detailUser.address}
                                                    />
                                                    {errors.address && touched.address ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.address}
                                                        </div>
                                                    ) : null}
                                                </FormGroup>

                                                <div className="d-flex justify-content-between align-items-center"><p />
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

export default FormikEditKaryawan;
