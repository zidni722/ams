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


const options = [
  { value: "software", label: "Software" },
  { value: "hardware", label: "Hardware" }
];

class FormPerbaikan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailBorrow: "",
      borrow_id: ''
    };
  }
  detailAsset() {
    console.log(this.state.detailAsset)
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

    apiClient.get("/borrows/" + value)
      .then(res => {
        console.log(res.data)
        this.setState({ detailBorrow: res.data.data })
      }).catch((e) => {
        console.log(e.message)
      })
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="menu.form-pengembalian" match={this.props.match} />
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
                  </div>
                  <div className="pl-3 pt-3">
                    <Formik>
                      {({
                        handleSubmit,
                        setFieldValue,
                        setFieldTouched,
                        handleChange,
                        handleBlur,
                        values,
                      }) => (
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
                </Colxx>
                <Colxx xxs="12" sm="6">
                  <div className="pt-5"><p />
                    <Table borderless>
                      <thead>
                        <tr>
                          <td className="pl-3 text-muted text-small">Kode</td>
                          <td>{this.state.detailBorrow.asset_code}</td>
                        </tr>
                        <tr>
                          <td className="pl-3 text-muted text-small">Nama Barang</td>
                          <td>{this.state.detailBorrow.asset_name}</td>
                        </tr>
                        <tr>
                          <td className="pl-3 text-muted text-small">Jenis Barang</td>
                          <td>{this.state.detailBorrow.asset_category_name}</td>
                        </tr>
                        <tr>
                          <td className="pl-3 text-muted text-small">Merk</td>
                          <td>{this.state.detailBorrow.asset_brand}</td>
                        </tr>
                        <tr>
                          <td className="pl-3 text-muted text-small">Tahun</td>
                          <td>{this.state.detailBorrow.asset_year}</td>
                        </tr>
                        <tr>
                          <td className="pl-3 text-muted text-small">Tanggal Peminjaman</td>
                          <td>{this.state.detailBorrow.updated_at}</td>
                        </tr>
                      </thead>
                    </Table>
                  </div>
                  <div className="pl-3 pr-5 mb-5 pt-5">
                    <Formik>
                      {({
                        handleSubmit,
                        setFieldValue,
                        setFieldTouched,
                        handleChange,
                        handleBlur,
                        values,
                      }) => (
                          <Form className="av-tooltip tooltip-label-right">
                            <FormGroup className="error-l-100">
                              <Label>Alasan Perbaikan</Label>
                              <Select
                                name="alasan"
                                value={values.reactSelect}
                                options={options}
                                onChange={setFieldValue}
                              />
                            </FormGroup>
                          </Form>
                        )}
                    </Formik>
                  </div>
                  <div className="pr-2 pl-2">
                    <Button className="float-right mb-5" style={{ float: 'center' }} size="lg" color="outline-primary" type="button" onClick={() => { }}>
                      Batal
                                  </Button>{" "}
                  </div>
                </Colxx>
              </Row>
              <div className="pr-5">

                {/*  */}
              </div>
            </Card>

          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(FormPerbaikan);
