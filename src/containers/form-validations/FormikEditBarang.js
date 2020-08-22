import React, { Component } from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import { FormikReactSelect } from "./FormikFields";
import { NotificationManager } from "../../components/common/react-notifications";
import { apiClient } from "../../helpers/ApiService";

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

class FormikEditBarang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'categories': '',
      'asset': ''
    };
  }
  componentDidMount() {
    const assetID = uri => uri.substring(uri.lastIndexOf('/') + 1);

    apiClient.get('/categories')
      .then(res => {
        let dataCategories = []
        const categories = res.data.data;
        for(const category of categories) {
          dataCategories.push({value:category.id, label:category.name})
        }
        this.setState( {dataCategories} );
      })

      apiClient.get('/assets/' + assetID(window.location.href))
        .then(res => {
          this.setState({asset: res.data.data})
        }).catch((e) => {
          console.log(e.message)
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
  }

  render() {
    return (
      <Row className="mb-4">
        <Colxx xxs="12" lg="12" xl="12" className="mb-3">
          <Card className="d-flex flex-row mb-3">
            <CardBody> 
              
              <Formik
              initialValues={{
                code: this.state.asset.code,
                name: this.state.asset.name,
                category: [{ value: this.state.asset.category, label: this.state.asset.category }],
                brand: this.state.asset.brand,
                year: this.state.asset.year,
                jumlah: this.state.asset.qty,
                harga: this.state.asset.price
              }}
              enableReinitialize={true}
              >
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
                      <input className="form-control"
                        name="code"
                        value={this.state.asset.code}
                      />
                      {errors.firstName && touched.firstName ? (
                        <div className="invalid-feedback d-block">
                          {errors.firstName}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="error-l-100">
                      <Label>Nama Barang</Label>
                      <input 
                        className="form-control" 
                        name="name" 
                        value={this.state.asset.name}
                      />
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
                      <input 
                        className="form-control" 
                        name="brand" 
                        value={this.state.asset.brand}
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
                        name="year"
                        type="number" 
                        value={this.state.asset.year}
                      />
                      {errors.npk && touched.npk ? (
                        <div className="invalid-feedback d-block">
                          {errors.npk}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="error-l-50">
                      <Label>Jumlah Barang</Label>
                      <input 
                        className="form-control" 
                        name="jumlah"
                        type="number" 
                        value={this.state.asset.qty}
                      />
                      {errors.npk && touched.npk ? (
                        <div className="invalid-feedback d-block">
                          {errors.npk}
                        </div>
                      ) : null}
                    </FormGroup>    

                    <FormGroup className="error-l-50">
                      <Label>Harga Barang</Label>
                      <input 
                        className="form-control" 
                        name="harga"
                        type="number" 
                        value={this.state.asset.price}
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

export default FormikEditBarang;
