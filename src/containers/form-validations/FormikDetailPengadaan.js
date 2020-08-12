import React, { Component } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import { FormikReactSelect } from "./FormikFields";
import { NotificationManager } from "../../components/common/react-notifications";
import { servicePath, token } from "../../constants/defaultValues";

import Axios from "axios";

const apiUrl = servicePath;

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

class FormikDetailPengadaan extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      categories: [],
      assets: []
    };
  }
  componentDidMount() {
    Axios.get(
      `${apiUrl}/categories`,
    {
      headers : {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        let dataCategories = []
        const categories = res.data.data;
        for(const category of categories) {
          dataCategories.push({value:category.id, label:category.name})
        }
        this.setState( {dataCategories} );
      })

      Axios.get(
        `${apiUrl}/assets`,
      {
        headers : {
          Authorization: 'Bearer ' + token
        }
      })
        .then(res => {
          let dataAssets = []
          const assets = res.data.data;
          for(const asset of assets) {
            dataAssets.push({value:asset.id, label:asset.name})
          }
          this.setState( {dataAssets} );
        })
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

  handleSubmit = event => {
    event.preventDefault();
    
    const apiClient = Axios.create({
      baseURL: apiUrl
    })

    apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInV1aWQiOiJlOGViN2QxZS03MDU1LTQxYzUtOWM3OC1hNDIyYWJjYzBkMWYiLCJuYW1lIjoiQXNyaSIsImVtYWlsIjoiYXNyaUBwYXdvb24uY29tIiwicm9sZV9pZCI6MjEsImRpdmlzaW9uX2lkIjoxLCJzdGF0dXMiOjAsImlhdCI6MTU5NjcyNjU3N30.bzIoNbnxSqxuzuV1d49S7JypGP9kC-wneFVZ6dMecPk';
    apiClient.defaults.headers.common['Accept'] = 'application/json';

    const url = '/borrows'
    let data = {
      //"asset_id" : "7caaa334-8f6e-42b0-96eb-dde2a483804e"
      "asset_id" : this.state.categoryID
    }
    console.log(this.state)
    console.log(data)

    apiClient.post(url, data)
      .then((res) => {
        const category = res.data.data;
        console.log(res)
        this.setState( {category} );
      })
  }

  render() {
    return (
      <Row className="mb-4">
        <Colxx xxs="12" lg="12" xl="12" className="mb-3">
          <Card className="d-flex flex-row mb-3">
            <CardBody>  
              <Formik>
                {({
                  setFieldValue,
                  setFieldTouched,
                  values,
                  errors,
                  touched,
                }) => (

                  <Form onSubmit={this.handleSubmit} className="av-tooltip tooltip-label-right">
                    <FormGroup row>
                      <Colxx sm={6}>
                        <FormGroup className="error-l-100">
                          <Label>Jenis Barang</Label>
                          <FormikReactSelect
                            name="JenisBarang"
                            id="jenisbarang"
                            value={values.dataCategories}
                            isMulti={false}
                            options={this.state.dataCategories}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                          />
                          {errors.categories && touched.categories ? (
                            <div className="invalid-feedback d-block">
                              {errors.categories}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Colxx>
                      <Colxx sm={6}>
                        <FormGroup className="error-l-100">
                          <Label>Nama Barang</Label>
                          <Field className="form-control" name="name" />
                          {errors.firstName && touched.firstName ? (
                            <div className="invalid-feedback d-block">
                              {errors.firstName}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Colxx>
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

export default FormikDetailPengadaan;
