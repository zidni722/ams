import React, { Component, Fragment } from "react";
import { Row, Card, Button, CardBody, CardTitle, DropdownMenu, UncontrolledDropdown, DropdownToggle, DropdownItem, Table, FormGroup, Label } from "reactstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import SingleLightbox from "../../../components/pages/SingleLightbox";
import { Formik, Form } from "formik";
import { apiClient } from "../../../helpers/ApiService";
import { reactLocalStorage } from "reactjs-localstorage";
import { me } from "../../../constants/defaultValues";
import Select from "react-select";
import { NotificationManager } from "../../../components/common/react-notifications";


class FormPerbaikan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailBorrow: '',
      asset_id: '',
      description: '',
      asset: reactLocalStorage.getObject('asset'),
      isLoading: false
    };
  }

  componentDidMount() {
    apiClient.get(`/borrows?user_id=${me.id}&status=1`)
      .then(res => {
        let dataBorrow = []
        const borrows = res.data.data;
        console.log(borrows);
        for (const borrow of borrows) {
          dataBorrow.push({ value: borrow.id, label: borrow.asset_name })
        }
        this.setState({ dataBorrow });
      }).catch((e) => {
        console.log(e.message)
      });
  }

  handlerSelectChange = (e, action) => {
    const { value } = e;
    const name = action
    this.setState({ [name]: value });
    reactLocalStorage.set(name, value);

    if (name === 'borrow') {
      apiClient.get("/borrows/" + value)
        .then(res => {
            if (res.status === 200) {
              this.setState({ detailBorrow: res.data.data })
            }
        }).catch((e) => {
          console.log(e.message)
        })
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event, values) => {
    event.preventDefault();

    apiClient.defaults.headers.common['Content-Type'] = 'application/json';

    const data = {
      "borrow_id": this.state.detailBorrow.id,
      "description": this.state.description,
    };

    apiClient.post('/services', data)
      .then(res => {
        if (res.status === 201) {
          window.location.href = "./menu-perbaikan" // similar behavior as clicking on a link
          reactLocalStorage.set('isSuccesSubmit', true)
        }
      }).catch((e) => {
        NotificationManager.error(
          `${e.response.data.data}`,
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
        <Fragment>
          <Row>
            <Colxx xxs="12">
              <Breadcrumb heading="menu.form-perbaikan" match={this.props.match} />
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row>
            <Colxx xxs="12" lg="1" xl="1" className="mb-5">
            </Colxx>
            <Colxx xxs="12" lg="10" xl="10" className="mb-3">
              <Card>
                <Row>
                  <Colxx xxs="12" sm="6">
                    <CardTitle className="pt-4 pl-4 mb-3">Informasi Pengembalian</CardTitle>
                    <div className="pl-3">
                      <div className="list-thumbnail-mid responsive border-0 card-img-fit-t">
                        <SingleLightbox thumb={this.state.detailBorrow.asset_photo ? this.state.detailBorrow.asset_photo : "https://res.cloudinary.com/hwqpjijac/image/upload/v1598947378/default-image_vxl2p2.jpg"} large={this.state.detailBorrow.asset_photo} className="list-thumbnail-mid responsive border-0 card-img-fit" />
                      </div>
                      <div className="pl-3 pr-5 mb-5 pt-3">
                        <Formik>
                          {({ values }) => (
                            <Form className="av-tooltip tooltip-label-right">
                              <FormGroup className="error-l-100">
                                <Label>Barang yang akan diperbaiki</Label>
                                <Select
                                  name="borrow"
                                  value={values.dataBorrow}
                                  options={this.state.dataBorrow}
                                  onChange={e => this.handlerSelectChange(e, 'borrow')}
                                />
                              </FormGroup>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>

                  </Colxx>
                  <Colxx xxs="12" sm="6">
                    <Form onSubmit={this.handleSubmit} className="av-tooltip tooltip-label-right">
                      <div className="pt-5"><p />
                        <Table borderless>
                          <thead>
                            <tr>
                              <td className="pt-3 pl-3 text-muted text-small">Kode</td>
                              <td>{this.state.detailBorrow.asset_code}</td>
                            </tr>
                            <tr>
                              <td className="pt-3 pl-3 text-muted text-small">Nama Barang</td>
                              <td>{this.state.detailBorrow.asset_name}</td>
                            </tr>
                            <tr>
                              <td className="pt-3 pl-3 text-muted text-small">Jenis Barang</td>
                              <td>{this.state.detailBorrow.asset_category_name}</td>
                            </tr>
                            <tr>
                              <td className="pt-3 pl-3 text-muted text-small">Merk</td>
                              <td>{this.state.detailBorrow.asset_brand}</td>
                            </tr>
                            <tr>
                              <td className="pt-3 pl-3 text-muted text-small">Tahun</td>
                              <td>{this.state.detailBorrow.asset_year}</td>
                            </tr>
                            <tr>
                              <td className="pt-3 pl-3 text-muted text-small">Tanggal Peminjaman</td>
                              <td>{this.state.detailBorrow.updated_at}</td>
                            </tr>
                          </thead>
                        </Table>
                      </div>
                      <div className="pl-3 pr-5 mb-5 pt-4">
                        <Formik>
                          <Form className="av-tooltip tooltip-label-right">
                            <FormGroup className="error-l-100">
                              <Label>Alasan Perbaikan</Label>
                              <input
                                className="form-control"
                                name="description"
                                component="textarea"
                                onChange={this.handleChange}
                              />
                            </FormGroup>
                          </Form>
                        </Formik>
                      </div>
                      <div className="pr-5 mb-3">
                        <Button className="float-right mb-5" style={{ float: 'right' }} size="lg" color="primary" type="submit">
                          Submit
                    </Button>
                        <Button className="float-right mb-5" style={{ float: 'center' }} size="lg" color="outline-primary" type="button" onClick={() => { }}>
                          Batal
                    </Button>
                      </div>
                    </Form>
                  </Colxx>
                </Row>
              </Card>
            </Colxx>
          </Row>
        </Fragment>
      );
  }
}
export default injectIntl(FormPerbaikan);
