import React, { Component } from "react";

import { Form, Formik } from "formik";
import * as Yup from "yup";

import { Button, Card, CardBody, FormGroup, Label, Row, Input, FormFeedback } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import { FormikReactSelect } from "./FormikFields";
import { NotificationManager } from "../../components/common/react-notifications";

import { apiClient } from "../../helpers/ApiService";
import { reactLocalStorage } from "reactjs-localstorage";

const SignupSchema = Yup.object().shape({
    code: Yup.string()
        .required("Kode Barang harus diisi!"),
    name: Yup.string()
        .required("Nama Barang harus diisi!"),
    brand: Yup.string()
        .required("Merek Barang harus diisi!"),
    year: Yup.string()
        .required("Tahun Barang harus diisi!"),
    qty: Yup.string()
        .required("Jumlah Barang harus diisi!"),
    price: Yup.string()
        .required("Jumlah Barang harus diisi!"),
    categories: Yup.object()
        .shape({
            label: Yup.string().required(),
            value: Yup.string().required()
        })
                    .nullable()
        .required("Jenis Barang harus diisi!"),
    assets: Yup.object()
        .shape({
            label: Yup.string().required(),
            value: Yup.string().required()
        })
        .nullable()
        .required("Nama Barang harus diisi!")
});

class FormikTambahBarang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            name: "",
            category: "",
            brand: "",
            year: "",
            qty: "",
            price: "",
            image: "",
            isValid: null
        };
    }

    componentDidMount() {
        apiClient.get('/categories')
            .then(res => {
                let dataCategory = [];
                const categories = res.data.data;
                for (const category of categories) {
                    dataCategory.push({ value: category.id, label: category.name })
                }
                this.setState({ dataCategory });
            }).catch((e) => {
                console.log(e.message)
            });
    }

    componentDidUpdate() {
        if (this.props.error) {
            NotificationManager.warning(
                this.props.error,
                "Login Error",
                3000,
                null,
                null,
                ''
            );
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFileChange = (e) => {
        this.setState({ [e.target.name]: e.target.files[0] });
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

        if (this.state.brand.length > 0) {
            this.setState({ isValid: true })
          } else if (this.state.brand.length === 0) {
            this.setState({ isValid: false })
          }

        if (this.state.year.length > 0) {
            this.setState({ isValid: true })
            } else if (this.state.year.length === 0) {
            this.setState({ isValid: false })
            }

        if (this.state.qty.length > 0) {
            this.setState({ isValid: true })
            } else if (this.state.qty.length === 0) {
            this.setState({ isValid: false })
            }

        if (this.state.price.length > 0) {
            this.setState({ isValid: true })
            } else if (this.state.price.length === 0) {
            this.setState({ isValid: false })
            }

        apiClient.defaults.headers.common['Content-Type'] = 'multipart/form-data';

        const formData = new FormData();

        formData.append('name', this.state.name)
        formData.append('brand', this.state.brand)
        formData.append('year', this.state.year)
        if (this.state.image) formData.append('image', this.state.image)
        formData.append('description', this.state.description)
        formData.append('category_id', reactLocalStorage.get('category'))
        formData.append('code', this.state.code)
        formData.append('qty', this.state.qty)
        formData.append('price', this.state.price)

        apiClient.post('/assets', formData)
            .then(res => {
                if (res.status === 200) {
                    window.location.href = "./barang" // similar behavior as clicking on a link
                }
            }).catch((e) => {
                console.log(e.message)
            });
    };


    render() {
        return (
            <Row className="mb-4">
                <Colxx xxs="12" lg="12" xl="12" className="mb-3">
                    <Card className="d-flex flex-row mb-3">
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
                                    setFieldValue,
                                    handleChange,
                                    handlerChange,
                                    handlerSubmit,
                                    setFieldTouched,
                                    values,
                                    errors,
                                    touched,
                                }) => (

                                        <Form onSubmit={this.handlerSubmit} className="av-tooltip tooltip-label-right">
                                            <FormGroup className="error-l-100">
                                                <Label>Kode Barang</Label>
                                                <Input
                                                    className="form-control"
                                                    onChange={this.handleChange}
                                                    name="code"
                                                    valid={this.state.isValid === true}
                                                    invalid={this.state.isValid === false}
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
                                                <Label>Nama Barang</Label>
                                                <input className="form-control"
                                                    onChange={this.handleChange}
                                                    name="name"
                                                    valid={this.state.isValid === true}
                                                    invalid={this.state.isValid === false}
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
                                                <Label>Jenis Barang</Label>
                                                <FormikReactSelect
                                                    name="category"
                                                    id="category"
                                                    value={values.dataCategory}
                                                    isMulti={false}
                                                    options={this.state.dataCategory}
                                                    onChange={setFieldValue}
                                                    onBlur={setFieldTouched}
                                                    valid={this.state.isValid === true}
                                                    invalid={this.state.isValid === false}
                                                />
                                                {this.state.isValid === false ? (
                                                    <span className="invalid-feedback d-block">
                                                        Wajib di isi!
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                                <FormFeedback>Oh noes! that name is already taken</FormFeedback>
  
                                            </FormGroup>

                                            <FormGroup className="error-l-50">
                                                <Label>Merek</Label>
                                                <input className="form-control"
                                                    onChange={this.handleChange}
                                                    name="brand"
                                                    valid={this.state.isValid === true}
                                                    invalid={this.state.isValid === false}
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
                                                <Label>Tahun</Label>
                                                <input
                                                    className="form-control"
                                                    onChange={this.handleChange}
                                                    name="year"
                                                    type="number"
                                                    valid={this.state.isValid === true}
                                                    invalid={this.state.isValid === false}
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
                                                <Label>Jumlah Barang</Label>
                                                <input
                                                    className="form-control"
                                                    onChange={this.handleChange}
                                                    name="qty"
                                                    type="number"
                                                    valid={this.state.isValid === true}
                                                    invalid={this.state.isValid === false}
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
                                                <Label>Harga Barang</Label>
                                                <input
                                                    className="form-control"
                                                    onChange={this.handleChange}
                                                    name="price"
                                                    type="number"
                                                    valid={this.state.isValid === true}
                                                    invalid={this.state.isValid === false}
                                                />
                                                {this.state.isValid === false ? (
                                                    <span className="invalid-feedback d-block">
                                                        Wajib di isi!
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </FormGroup>

                                            <FormGroup className="error-l-75">
                                                <Label>Deskripsi</Label>
                                                <textarea
                                                    className="form-control"
                                                    onChange={this.handleChange}
                                                    name="description"
                                                    type="text"
                                                    valid={this.state.isValid === true}
                                                    invalid={this.state.isValid === false}
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
                                                <Label>Upload Gambar</Label>
                                                <div className="mb-2">
                                                    <input
                                                        type="file"
                                                        name="image"
                                                        accept="image/jpeg, image/png"
                                                        onChange={this.handleFileChange} />
                                                </div>
                                            </FormGroup>

                                            <div className="d-flex justify-content-between align-items-center"><p />
                                                <Button color="primary" size="lg" type="submit">
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

export default FormikTambahBarang;
