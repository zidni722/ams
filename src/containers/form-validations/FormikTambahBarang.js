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

class FormikTambahBarang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'categories': '',
      'assets': ''
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

  handlerChange = (e) =>{
    this.setState({[e.target.name] : e.target.value})
  }

  handlerSubmit = async (event) => {
    event.preventDefault();

    await Axios.post(`${apiUrl}/users`, this.state)
    this.props.history.push('/karyawan')
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
                  handleChange,
                  handleSubmit,
                  setFieldTouched,
                  values,
                  errors,
                  touched,
                }) => (

                  <Form onSubmit={this.handlerSubmit} className="av-tooltip tooltip-label-right">
                    <FormGroup className="error-l-100">
                      <Label>Kode Barang</Label>
                      <Field className="form-control" name="code" />
                      {errors.firstName && touched.firstName ? (
                        <div className="invalid-feedback d-block">
                          {errors.firstName}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="error-l-100">
                      <Label>Nama Barang</Label>
                      <Field className="form-control" name="name" />
                      {errors.firstName && touched.firstName ? (
                        <div className="invalid-feedback d-block">
                          {errors.firstName}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="error-l-100">
                      <Label>Jenis Barang</Label>
                      <FormikReactSelect
                        name="category"
                        id="category"
                        value={values.dataCategories}
                        isMulti={false}
                        options={this.state.dataCategories}
                        onChange={handleChange}
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
                      <Field className="form-control" name="brand" />
                      {errors.firstName && touched.firstName ? (
                        <div className="invalid-feedback d-block">
                          {errors.firstName}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="error-l-50">
                      <Label>Tahun</Label>
                      <Field 
                        className="form-control" 
                        name="year"
                        type="number" 
                      />
                      {errors.npk && touched.npk ? (
                        <div className="invalid-feedback d-block">
                          {errors.npk}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="error-l-50">
                      <Label>Jumlah Barang</Label>
                      <Field 
                        className="form-control" 
                        name="jumlah"
                        type="number" 
                      />
                      {errors.npk && touched.npk ? (
                        <div className="invalid-feedback d-block">
                          {errors.npk}
                        </div>
                      ) : null}
                    </FormGroup>    

                    <FormGroup className="error-l-50">
                      <Label>Harga Barang</Label>
                      <Field 
                        className="form-control" 
                        name="jumlah"
                        type="number" 
                      />
                      {errors.npk && touched.npk ? (
                        <div className="invalid-feedback d-block">
                          {errors.npk}
                        </div>
                      ) : null}
                    </FormGroup>  

                    <FormGroup className="error-l-50">
                      <Label>Upload Gambar</Label>
                        <div className="mb-2">
                          <input type="file" name="image" onChange= {this.onChange} />
                        </div>
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

export default FormikTambahBarang;
