import React, { Component } from "react";

import { Formik, Form } from "formik";

import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import { FormikReactSelect } from "./FormikFields";
import { NotificationManager } from "../../components/common/react-notifications";
import { apiClient } from "../../helpers/ApiService";
import { reactLocalStorage } from "reactjs-localstorage";
import Select from 'react-select'

class FormikEditBarang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      code: "",
      name: "",
      category: "",
      defaultCategory: "",
      brand: "",
      year: "",
      qty: "",
      price: "",
      image: "",
      isValid: null,
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
        for (const category of categories) {
          dataCategories.push({ value: category.id, label: category.name })
        }
        this.setState({ dataCategories });
      })

    apiClient.get('/assets/' + assetID(window.location.href))
      .then(res => {
        this.setState({ asset: res.data.data })

        this.setState({ code: this.state.asset.code })
        this.setState({ name: this.state.asset.name })
        this.setState({ category: this.state.asset.category_id })
        this.setState({ brand: this.state.asset.brand })
        this.setState({ year: this.state.asset.year })
        this.setState({ qty: this.state.asset.qty })
        this.setState({ price: this.state.asset.price })
        this.setState({ image: this.state.asset.image })


        reactLocalStorage.set('defaultCategoryValue', this.state.asset.category_id);
        reactLocalStorage.set('defaultCategoryLabel', this.state.asset.category_name);
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

  handlerChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handlerSelectChange = (e, action) => {
    const { value } = e;
    const name = action
    this.setState({ [name]: value });
    reactLocalStorage.set(name, value);
  };

  handleFileChange = (e) => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };

  handlerSubmit = async (event) => {
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

    console.log(reactLocalStorage.get('category'));
    apiClient.put('/assets/' + this.state.asset.id, formData)
      .then(res => {
        if (res.status === 200) {
          window.location.href = "../barang"
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

              <Formik
                initialValues={{

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
                        <input
                          className="form-control"
                          name="code"
                          defaultValue={this.state.asset.code}
                          onChange={this.handlerChange}
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
                          defaultValue={this.state.asset.name}
                          onChange={this.handlerChange}
                        />
                        {errors.firstName && touched.firstName ? (
                          <div className="invalid-feedback d-block">
                            {errors.firstName}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="error-l-100">
                        <Label>Jenis Barang</Label>
                        <Select
                          name="category"
                          id="category"
                          defaultValue={{ value: reactLocalStorage.get('defaultCategoryValue'), label: reactLocalStorage.get('defaultCategoryLabel') }}
                          options={this.state.dataCategories}
                          onChange={e => this.handlerSelectChange(e, 'category')}
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
                          defaultValue={this.state.asset.brand}
                          onChange={this.handlerChange}
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
                          defaultValue={this.state.asset.year}
                          onChange={this.handlerChange}
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
                          name="qty"
                          type="number"
                          defaultValue={this.state.asset.qty}
                          onChange={this.handlerChange}
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
                          name="price"
                          defaultValue={this.state.asset.price}
                          onChange={this.handlerChange}
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

export default FormikEditBarang;