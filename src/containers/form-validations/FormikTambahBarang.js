import React, { Component } from "react";

import { Formik, Form } from "formik";
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
                            onChange={handleChange}
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
                          <FormikReactSelect
                            name="NamaBarang"
                            id="namabarang"
                            value={values.dataAssets}
                            isMulti={false}
                            options={this.state.dataAssets}
                            onChange={handleChange}
                            onBlur={setFieldTouched}
                          />
                          {errors.assets && touched.assets ? (
                            <div className="invalid-feedback d-block">
                              {errors.assets}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Colxx>
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

export default FormikTambahBarang;
