import React, { Component } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import { FormikReactSelect } from "./FormikFields";
import { NotificationManager } from "../../components/common/react-notifications";

import { apiClient } from "../../helpers/ApiService";
import { reactLocalStorage } from "reactjs-localstorage";

class FormikEditPengadaan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      brand: "",
      year: "",
      category: "",
      description: "",
      'categories': '',
      'procurement': ''
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
      })

    const procurementID = uri => uri.substring(uri.lastIndexOf('/') + 1);

    apiClient.get('/procurements/' + procurementID(window.location.href))
      .then(res => {
        this.setState({ procurement: res.data.data })

        this.setState({ name: this.state.procurement.name })
        this.setState({ category: this.state.procurement.category_id })
        this.setState({ brand: this.state.procurement.brand })
        this.setState({ year: this.state.procurement.year })
        this.setState({ description: this.state.procurement.description })
        this.setState({ invoice_number: this.state.procurement.invoice_number })
        this.setState({ invoice_number: this.state.procurement.asset_category_name })



        reactLocalStorage.set('defaultCategoryValue', this.state.procurement.asset_category_id);
        reactLocalStorage.set('defaultCategoryLabel', this.state.procurement.asset_category_name);

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
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFileChange = (e) => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };

  handleAlert = (state, value) => {
    this.setState({ [state]: value })
  }

  handlerSubmit = async (event, values) => {
    event.preventDefault();

    apiClient.defaults.headers.common['Content-Type'] = 'multipart/form-data';

    const formData = new FormData();

    formData.append('invoice_number', this.state.invoice_number)
    if (this.state.invoice) formData.append('invoice', this.state.invoice)

    apiClient.put('/procurements/' + this.state.procurement.id + '/approve?action=true', formData)
      .then(res => {
        if (res.status === 200) {
          window.location.href = "../pengadaan/" + this.state.procurement.id // similar behavior as clicking on a link
          reactLocalStorage.set('isSuccesSubmit', true)
          console.log(res.data);
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
              <Formik enableReinitialize={true}>
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
                        <input disabled
                          className="form-control"
                          onChange={this.handleChange}
                          name="name"
                          defaultValue={this.state.procurement.name}
                        />
                      </FormGroup>

                      <FormGroup className="error-l-100">
                        <Label>Jenis Barang</Label>
                        <input disabled
                          className="form-control"
                          name="category"
                          id="category"
                          defaultValue={this.state.procurement.asset_category_name}
                        // options={this.state.dataCategory}
                        />
                        {errors.categories && touched.categories ? (
                          <div className="invalid-feedback d-block">
                            {errors.categories}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="error-l-100">
                        <Label>Merek</Label>
                        <input disabled
                          className="form-control"
                          onChange={this.handleChange}
                          name="brand"
                          defaultValue={this.state.procurement.brand}
                        />
                        {errors.firstName && touched.firstName ? (
                          <div className="invalid-feedback d-block">
                            {errors.firstName}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="error-l-50">
                        <Label>Tahun</Label>
                        <input disabled
                          className="form-control"
                          onChange={this.handleChange}
                          name="year"
                          type="year"
                          defaultValue={this.state.procurement.year}
                        />
                        {errors.npk && touched.npk ? (
                          <div className="invalid-feedback d-block">
                            {errors.npk}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="error-l-100">
                        <Label>Deskripsi</Label>
                        <input disabled
                          className="form-control"
                          onChange={this.handleChange}
                          name="description"
                          defaultValue={this.state.procurement.description}

                        />
                        {errors.firstName && touched.firstName ? (
                          <div className="invalid-feedback d-block">
                            {errors.firstName}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="error-l-100">
                        <Label>No Invoice</Label>
                        <input
                          className="form-control"
                          onChange={this.handleChange}
                          name="invoice_number"
                        />
                      </FormGroup>

                      <FormGroup className="error-l-50">
                        <Label>Upload Invoice</Label>
                        <div className="mb-2">
                          <input
                            type="file"
                            name="invoice"
                            accept="image/jpeg, image/png"
                            onChange={this.handleFileChange} />
                        </div>
                      </FormGroup>

                      <div className="pr-5 mb-3">
                        <Button className="float-right mb-5" style={{ float: 'right' }} size="lg" color="primary" type="submit">
                          Submit
                        </Button>{" "}
                        <Button className="float-right mb-5" style={{ float: 'center' }} size="lg" color="outline-primary" type="button" onClick={() => { }}>
                          Batal
                        </Button>{" "}
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

export default FormikEditPengadaan;