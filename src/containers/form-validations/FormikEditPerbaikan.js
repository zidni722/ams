import React, { Component } from "react";

import { Formik, Form, Field } from "formik";

import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import { NotificationManager } from "../../components/common/react-notifications";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import { apiClient } from "../../helpers/ApiService";
import { reactLocalStorage } from "reactjs-localstorage";
import DatePicker from "react-datepicker";
import { formatDate } from "../../components/charts/util";
import { me } from "../../constants/defaultValues";


class FormikEditPerbaikan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      brand: "",
      year: "",
      category: "",
      description: "",
      detailService: "",
      'categories': '',
      'services': '',
      startDate: null,
      startDateTime: null,
      startDateRange: null,
      endDateRange: null,
      embeddedDate: moment(),
      isLoading: false
    };
  }

  componentDidMount() {
    const serviceID = uri => uri.substring(uri.lastIndexOf('/') + 1);
    reactLocalStorage.set('currentServiceID', serviceID(window.location.href));

    apiClient.get('/services/' + serviceID(window.location.href))
      .then(res => {
        setTimeout(() => {
          this.setState({ isLoading: true })
          this.setState({ detailService: res.data.data })
        }, 200)
      }).catch((e) => {
        console.log(e.message)
      });
  }

  handleChangeDate = date => {
    this.setState({
      startDate: date
    });
  };

  handleChangeDateTime = date => {
    this.setState({
      startDateTime: date
    });
  };

  handleChangeStart = date => {
    this.setState({
      startDateRange: date
    });
  };

  handleChangeEnd = date => {
    this.setState({
      endDateRange: date
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFileChange = (e) => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };

  handleAlert = (state, value) => {
    this.setState({ [state]: value })
  }

  handlerSubmit = (event, values) => {
    event.preventDefault();

    let data = {
      'action' : 'approve'
    }

    if (me.role_name.toLowerCase() === 'super admin') {
      apiClient.defaults.headers.common['Content-Type'] = 'multipart/form-data';
      let formData = new FormData();

      formData.append('action', 'approve')
      formData.append('invoice_number', this.state.invoice_number)
      if (this.state.invoice) formData.append('invoice', this.state.invoice)
      formData.append('start_date', formatDate(this.state.startDateRange, 'YYYY-MM-DD HH:MM:SS'))
      formData.append('end_date', formatDate(this.state.endDateRange, 'YYYY-MM-DD HH:MM:SS'))

      data = formData
    }

    apiClient.put('/services/' + this.state.detailService.id, data)
      .then(res => {
        if (res.status === 200) {
          window.location.href = "../perbaikan/" + this.state.detailService.id // similar behavior as clicking on a link
          reactLocalStorage.set('isSuccesSubmit', true)
        }
      }).catch((e) => {
        NotificationManager.error(
          `${JSON.stringify(e.response.data)}`,
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
                  errors,
                  touched
                }) => (

                    <Form onSubmit={this.handlerSubmit} className="av-tooltip tooltip-label-right">
                      <FormGroup className="error-l-100">
                        <Label>Kode Barang</Label>
                        <input disabled
                          className="form-control"
                          onChange={this.handleChange}
                          name="code"
                          defaultValue={this.state.detailService.asset_code}
                        />
                      </FormGroup>

                      <FormGroup className="error-l-100">
                        <Label>Nama Barang</Label>
                        <input disabled
                          className="form-control"
                          name="name"
                          defaultValue={this.state.detailService.asset_name}
                        />
                        {errors.categories && touched.categories ? (
                          <div className="invalid-feedback d-block">
                            {errors.categories}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="error-l-100">
                        <Label>Jenis Barang</Label>
                        <input disabled
                          className="form-control"
                          onChange={this.handleChange}
                          name="category"
                          defaultValue={this.state.detailService.asset_category_name}
                        />
                        {errors.firstName && touched.firstName ? (
                          <div className="invalid-feedback d-block">
                            {errors.firstName}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="error-l-50">
                        <Label>Merek</Label>
                        <input disabled
                          className="form-control"
                          onChange={this.handleChange}
                          name="brand"
                          defaultValue={this.state.detailService.asset_brand}
                        />
                        {errors.npk && touched.npk ? (
                          <div className="invalid-feedback d-block">
                            {errors.npk}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="error-l-100">
                        <Label>Tahun</Label>
                        <input disabled
                          className="form-control"
                          onChange={this.handleChange}
                          name="year"
                          defaultValue={this.state.detailService.asset_year}

                        />
                        {errors.firstName && touched.firstName ? (
                          <div className="invalid-feedback d-block">
                            {errors.firstName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {
                        me.role_name.toLowerCase() === 'super admin' &&
                        <FormGroup className="error-l-100">
                          <Label>Waktu Perbaikan</Label>
                          <Row className="mb-5">
                            <Colxx xxs="6">
                              <DatePicker
                                selected={this.state.startDateRange}
                                selectsStart
                                startDate={this.state.startDateRange}
                                endDate={this.state.endDateRange}
                                dateFormat="YYYY/MM/DD"
                                onChange={this.handleChangeStart}
                                placeholderText={"Tanggal Pengajuan"}
                              />
                            </Colxx>
                            <Colxx xxs="6">
                              <DatePicker
                                selected={this.state.endDateRange}
                                selectsEnd
                                startDate={this.state.startDateRange}
                                endDate={this.state.endDateRange}
                                dateFormat="YYYY/MM/DD"
                                onChange={this.handleChangeEnd}
                                placeholderText={"Tanggal Selesai"}
                              />
                            </Colxx>
                          </Row>
                        </FormGroup>
                      }
                      {me.role_name.toLowerCase() === 'super admin' &&
                      <FormGroup className="error-l-100">
                      <Label>No Invoice</Label>
                      <input
                        className="form-control"
                        onChange={this.handleChange}
                        name="invoice_number"
                      />
                    </FormGroup>
                      
                        }
                      
                      {me.role_name.toLowerCase() === 'super admin' &&
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
                      }

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

export default FormikEditPerbaikan;