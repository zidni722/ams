import React, { Component } from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import { FormikReactSelect } from "./FormikFields";
import { NotificationManager } from "../../components/common/react-notifications";

import { apiClient } from "../../helpers/ApiService";
import { reactLocalStorage } from "reactjs-localstorage";
import Select from "react-select";

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

class FormikPeminjamanBarang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asset_id: "",
      category_id:""
    };

  }
  componentDidMount() {
    apiClient.get('/categories')
      .then(res => {
        let dataCategories = []
        const categories = res.data.data;
        for (const category of categories) {
          dataCategories.push({ value: category.id, label: category.name })
        }
        this.setState({ dataCategories });
      }).catch((e) => {
        console.log(e.message)
      });


    apiClient.get(`/assets`)
      .then(res => {
        let dataAssets = []
        const assets = res.data.data;
        for (const asset of assets) {
          dataAssets.push({ value: asset.id, label: asset.name })
        }
        this.setState({ dataAssets });
      }).catch((e) => {
        console.log(e.message)
      });
  }

  handlerSelectChange = (e, action) => {
    const { value } = e;
    const name = action
    this.setState({ [name]: value });
    reactLocalStorage.set(name, value);
  };

  handleSubmit = async (event, values) => {
    event.preventDefault();

    apiClient.defaults.headers.common['Content-Type'] = 'application/json';

    const data = {
      "asset_id": reactLocalStorage.get('asset'),
      "category_id": reactLocalStorage.get('category')
    };

    apiClient.post('/borrows', data)
      .then(res => {
        if (res.status === 200) {
          window.location.href = "./peminjaman" // similar behavior as clicking on a link
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
        <Colxx xxs="12" lg="12" xl="12" className="mb-3">
          <Card className="d-flex flex-row mb-3">
            <CardBody>
              <Formik >
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
                            <Select
                              name="category"
                              id="category"
                              value={values.dataCategories}
                              options={this.state.dataCategories}
                              onChange={e => this.handlerSelectChange(e, 'category')}
                            />
                          </FormGroup>
                        </Colxx>
                        <Colxx sm={6}>
                          <FormGroup className="error-l-100">
                            <Label>Nama Barang</Label>
                            <Select
                              name="asset"
                              id="asset"
                              value={values.dataAssets}
                              options={this.state.dataAssets}
                              onChange={e => this.handlerSelectChange(e, 'asset')}
                            />
                          </FormGroup>
                        </Colxx>
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

export default FormikPeminjamanBarang;