import React, { Component } from "react";
import { reactLocalStorage } from 'reactjs-localstorage';

import { Form, Formik } from "formik";

import { Button, Card, CardBody, FormGroup, Label, Row } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import { me } from "../../constants/defaultValues";
import { apiClient } from "../../helpers/ApiService";
import Select from "react-select";
import { NotificationManager } from "../../components/common/react-notifications";

class FormikEditProfil extends Component {
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
            division: "",
            detailUser: ''
        };
    }

    componentDidMount() {
        apiClient.get('/users/' + me.id)
            .then(res => {
                this.setState({ detailUser: res.data.data })

                this.setState({ code: this.state.detailUser.code })
                this.setState({ name: this.state.detailUser.name })
                this.setState({ email: this.state.detailUser.email })
                this.setState({ role: this.state.detailUser.role_id })
                this.setState({ division: this.state.detailUser.division_id })
                this.setState({ city: this.state.detailUser.city_id })
                this.setState({ phone: this.state.detailUser.phone })
                this.setState({ address: this.state.detailUser.address })
                this.setState({ photo: this.state.detailUser.photo })

                reactLocalStorage.set('defaultRoleValue', this.state.detailUser.role_id);
                reactLocalStorage.set('defaultRoleLabel', this.state.detailUser.role_name);
                reactLocalStorage.set('defaultDivisionValue', this.state.detailUser.division_id);
                reactLocalStorage.set('defaultDivisionLabel', this.state.detailUser.division_name);
                reactLocalStorage.set('defaultCityValue', this.state.detailUser.city_id);
                reactLocalStorage.set('defaultCityLabel', this.state.detailUser.city_name);

            }).catch((e) => {
            console.log(e.message)
        })

        apiClient.get('/cities')
            .then(res => {
                let dataCities = [];
                const cities = res.data.data;
                for (const city of cities) {
                    dataCities.push({ value: city.id, label: city.name })
                }
                this.setState({ dataCities });
                console.log(this.state.dataCities);
            }).catch((e) => {
                console.log(e.message)
            })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleFileChange = (e) => {
        this.setState({ [e.target.name]: e.target.files[0] });
    };

    handlerSelectChange = (e, action) => {
        const { value } = e;
        const name = action
        this.setState({ [name]: value });
        reactLocalStorage.set(name, value);
    };

    handlerSubmit = async (event, values) => {
        event.preventDefault();

        apiClient.defaults.headers.common['Content-Type'] = 'multipart/form-data';

        const formData = new FormData();

        formData.append('name', this.state.name)
        formData.append('email', this.state.email)
        formData.append('phone', this.state.phone)
        formData.append('address', this.state.address)
        formData.append('code', this.state.code)
        formData.append('city_id', this.state.city)
        formData.append('role_id', this.state.role)
        formData.append('division_id', this.state.division)

        if (this.state.photo) formData.append('photo', this.state.photo)
        if (this.state.pasword) formData.append('password', this.state.password)

        apiClient.put('/users/' + this.state.detailUser.id, formData)
            .then(res => {
                if (res.status === 200) {
                    apiClient.get('/users/' + this.state.detailUser.id)
                        .then(res => {
                            if (res.status === 200) {
                                const newMe = res.data.data
                                newMe.token = me.token

                                reactLocalStorage.remove('me')
                                reactLocalStorage.setObject('me', newMe)
                                window.location.href = "./profil"
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
                console.log(this.state.detailUser);
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
                            <Formik enableReinitialize={true}>
                                {() => (
                                    <Form onSubmit={this.handlerSubmit} className="av-tooltip tooltip-label-right">
                                        <FormGroup className="error-l-50">
                                            <Label>NPK</Label>
                                            <input disabled
                                                className="form-control"
                                                name="code"
                                                defaultValue={me.code}
                                                onChange={this.handleChange}

                                            />
                                        </FormGroup>

                                        <FormGroup className="error-l-100">
                                            <Label>Nama Lengkap</Label>
                                            <input
                                                className="form-control"
                                                name="name"
                                                defaultValue={me.name}
                                                onChange={this.handleChange}

                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>Email</Label>
                                            <input disabled
                                                className="form-control"
                                                name="email"
                                                type="email"
                                                defaultValue={me.email}
                                                onChange={this.handleChange}

                                            />
                                        </FormGroup>

                                        <FormGroup className="error-l-50">
                                            <Label>Nomor Telepon</Label>
                                            <input
                                                className="form-control"
                                                name="phone"
                                                country='id'
                                                defaultValue={me.phone}
                                                onChange={this.handleChange}
                                            />
                                        </FormGroup>

                                        <FormGroup className="error-l-50">
                                            <Label>City</Label>
                                            <Select
                                                name="city"
                                                // id="city"
                                                defaultValue={{ value: reactLocalStorage.get('defaultCityValue'), label: reactLocalStorage.get('defaultCityLabel') }}
                                                options={this.state.dataCities}
                                                onChange={e => this.handlerSelectChange(e, 'city')}
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>Alamat</Label>
                                            <input
                                                className="form-control"
                                                name="address"
                                                component="textarea"
                                                defaultValue={me.address}
                                                onChange={this.handleChange}
                                            />
                                        </FormGroup>

                                        <FormGroup className="error-l-50">
                                            <Label>Upload Gambar</Label>
                                            <div className="mb-2">
                                                <input
                                                    type="file"
                                                    name="photo"
                                                    accept="image/jpeg, image/png"
                                                    onChange={this.handleFileChange} />
                                            </div>
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

export default FormikEditProfil;
