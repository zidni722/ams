import React, { Component } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import { FormikReactSelect } from "./FormikFields";
import { NotificationManager } from "../../components/common/react-notifications";
import { servicePath, token } from "../../constants/defaultValues";

import Axios from "axios";
import { apiClient } from "../../helpers/ApiService";
import { reactLocalStorage } from "reactjs-localstorage";

const SignupSchema = Yup.object().shape({
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

class FormikPengadaan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      brand: "",
      year: "",
      category: "",
      description:""
    };
  }

  componentDidMount() {
    apiClient.get('/categories')
        .then(res => {
            let dataCategory = [];
            const categories = res.data.data;
            for (const category of categories) {
              dataCategory.push({value: category.id, label: category.name})
            }
            this.setState({dataCategory});
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

  handleChange = (e) =>{
    this.setState({[e.target.name] : e.target.value})
  }

  handlerSubmit = async (event, values) => {
    event.preventDefault();

    apiClient.defaults.headers.common['Content-Type'] = 'application/json';

    const data = {
        "name": this.state.name,
        "category_id": reactLocalStorage.get('category'),
        "brand": this.state.brand,
        "year": this.state.year,
        "description": this.state.description
    };

    apiClient.post('/procurements', data)
        .then(res => {
            if (res.status === 200) {
                window.location.href = "./pengadaan" // similar behavior as clicking on a link
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
                        "Pengadaan berhasil ditambahkan",
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
                  setFieldTouched,
                  handleChange,
                  values,
                  errors,
                  touched,
                }) => (

                  <Form onSubmit={this.handlerSubmit} className="av-tooltip tooltip-label-right">
                    <FormGroup className="error-l-100">
                      <Label>Nama Barang</Label>
                      <input className="form-control" 
                        onChange={this.handleChange}                        
                        name="name" 
                      />
                      {errors.firstName && touched.firstName ? (
                        <div className="invalid-feedback d-block">
                          {errors.name}
                        </div>
                      ) : null}
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
                      />
                      {errors.categories && touched.categories ? (
                        <div className="invalid-feedback d-block">
                          {errors.categories}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="error-l-100">
                      <Label>Merek</Label>
                      <input className="form-control"
                        onChange={this.handleChange}                        
                        name="brand" 
                      />
                      {errors.firstName && touched.firstName ? (
                        <div className="invalid-feedback d-block">
                          {errors.firstName}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="error-l-50">
                      <Label>Tahun</Label>
                      <input 
                        className="form-control"
                        onChange={this.handleChange} 
                        name="year"
                        type="number" 
                      />
                      {errors.npk && touched.npk ? (
                        <div className="invalid-feedback d-block">
                          {errors.npk}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="error-l-100">
                      <Label>Deskripsi</Label>
                      <input className="form-control"
                        onChange={this.handleChange} 
                        name="description" 
                      />
                      {errors.firstName && touched.firstName ? (
                        <div className="invalid-feedback d-block">
                          {errors.firstName}
                        </div>
                      ) : null}
                    </FormGroup>

                    <div className="d-flex justify-content-between align-items-center"><p/>
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

export default FormikPengadaan;
