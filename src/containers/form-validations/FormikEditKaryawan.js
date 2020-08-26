import React, {Component} from "react";
import {reactLocalStorage} from 'reactjs-localstorage';

import {Form, Formik} from "formik";

import {Button, Card, CardBody, FormGroup, Label, Row} from "reactstrap";
import {Colxx} from "../../components/common/CustomBootstrap";
import PhoneInput from 'react-phone-input-2'
import {apiClient} from "../../helpers/ApiService";
import Select from 'react-select'


class FormikEditKaryawan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailUser:''
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

        const userID = uri => uri.substring(uri.lastIndexOf('/') + 1);

        apiClient.get('/users/' + userID(window.location.href))
        .then(res => {
          this.setState({detailUser: res.data.data})

          this.setState({code: this.state.detailUser.code})
          this.setState({name: this.state.detailUser.name})
          this.setState({email: this.state.detailUser.email})
          this.setState({role: this.state.detailUser.role_id})
          this.setState({division: this.state.detailUser.division_id})
          this.setState({city: this.state.detailUser.city_id})
          this.setState({phone: this.state.detailUser.phone})
          this.setState({address: this.state.detailUser.address})

          reactLocalStorage.set('defaultRoleValue',this.state.detailUser.role_id);
          reactLocalStorage.set('defaultRoleLabel',this.state.detailUser.role_name);
          reactLocalStorage.set('defaultDivisionValue',this.state.detailUser.division_id);
          reactLocalStorage.set('defaultDivisionLabel',this.state.detailUser.division_name);
          reactLocalStorage.set('defaultCityValue',this.state.detailUser.city_id);
          reactLocalStorage.set('defaultCityLabel',this.state.detailUser.city_name);

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

    handlerSelectChange = (e, action) => {
        const {value} = e;
        const name = action
        this.setState({[name]: value});
        reactLocalStorage.set(name, value);
      };

    handlerSubmit = async (event, values) => {
        event.preventDefault();

        apiClient.defaults.headers.common['Content-Type'] = 'application/json';

        const formData = new FormData();

        formData.append('name', this.state.name)
        formData.append('email', this.state.email)
        formData.append('phone', this.state.phone)
        formData.append('address', this.state.address)
        formData.append('code', this.state.code)
        formData.append('city_id', this.state.city)
        formData.append('role_id', this.state.role)
        formData.append('division_id', this.state.division)

        apiClient.put('/users/'+ this.state.detailUser.id, formData)
            .then(res => {
            if (res.status === 200){
                window.location.href="../karyawan"
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
                                                onChange={this.handleChange}
                                                className="form-control"
                                                name="code"
                                                defaultValue={this.state.detailUser.code}
                                            />
                                            {errors.code && touched.code ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.code}
                                                </div>
                                            ) : null}
                                        </FormGroup>

                                        <FormGroup className="error-l-100">
                                            <Label>Nama Lengkap</Label>
                                            <input 
                                                onChange={this.handleChange}
                                                className="form-control" 
                                                name="name"
                                                defaultValue={this.state.detailUser.name}
                                                />
                                            {errors.firstName && touched.firstName ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.firstName}
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
                                                defaultValue={this.state.detailUser.email}
                                            />
                                            {errors.email && touched.email ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.email}
                                                </div>
                                            ) : null}
                                        </FormGroup>

                                        <FormGroup className="error-l-50">
                                            <Label>Role</Label>
                                            <Select
                                                name="role"
                                                id="role"
                                                defaultValue={{ value: reactLocalStorage.get('defaultRoleValue'), label: reactLocalStorage.get('defaultRoleLabel') }}
                                                options={this.state.dataRoles}
                                                onChange={e => this.handlerSelectChange(e, 'role')}
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
                                            <Select
                                                name="division"
                                                id="division"
                                                defaultValue={{ value: reactLocalStorage.get('defaultDivisionValue'), label: reactLocalStorage.get('defaultDivisionLabel') }}
                                                options={this.state.dataDivisions}
                                                onChange={e => this.handlerSelectChange(e, 'division')}
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
                                                value={this.state.detailUser.phone}
                                                onChange={phone => this.setState({phone})}
                                            />
                                        </FormGroup>

                                        <FormGroup className="error-l-50">
                                            <Label>City</Label>
                                            <Select
                                                name="city"
                                                id="city"
                                                defaultValue={{ value: reactLocalStorage.get('defaultCityValue'), label: reactLocalStorage.get('defaultCityLabel') }}
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

export default FormikEditKaryawan;
