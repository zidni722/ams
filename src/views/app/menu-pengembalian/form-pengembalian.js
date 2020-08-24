import React, { Component, Fragment } from "react";
import { Row, Card, Button, CardTitle, Table, FormGroup, Label } from "reactstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import SingleLightbox from "../../../components/pages/SingleLightbox";
import { FormikReactSelect } from "../../../containers/form-validations/FormikFields";
import { Formik, Form } from "formik";
import { apiClient } from "../../../helpers/ApiService";


const options = [
  { value: "resign", label: "Resign" },
  { value: "new", label: "Ganti Baru" }
];

class FormPengembalian extends Component {
    constructor(props) {
        super(props);
        this.state = {
          detailReturn:""
        };
    }

    componentDidMount() {
      const returnID = uri => uri.substring(uri.lastIndexOf('/') + 1);

      apiClient.get('/borrows/' + returnID(window.location.href))
          .then(res => {
              this.setState({detailReturn: res.data.data})
          }).catch((e) => {
          console.log(e.message)
      })
    }

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
                                <SingleLightbox thumb={this.state.detailReturn.asset_photo} large={this.state.detailReturn.asset_photo} className="list-thumbnail-mid responsive border-0 card-img-fit" />
                              </div>
                              </Colxx>
                              <Colxx xxs="12" sm="6">
                              <div className="pl-3 pr-5 mb-5">
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
                                      <Label>Alasan Pengembalian</Label>
                                      <FormikReactSelect
                                        name="reactSelect"
                                        id="reactSelect"
                                        value={values.reactSelect}
                                        isMulti={false}
                                        options={options}
                                        onChange={setFieldValue}
                                        onBlur={setFieldTouched}
                                      />
                                    </FormGroup>
                                  </Form>
                                  )}
                                </Formik> 
                              </div>  
                              <div className="pt-5 mb-3"><p/>
                                <Table borderless>
                                  <thead>
                                    <tr>
                                      <td className="pl-3 text-muted text-small">Kode</td>
                                      <td>{this.state.detailReturn.asset_code}</td>
                                    </tr>
                                    <tr>
                                      <td className="pl-3 text-muted text-small">Nama Barang</td>
                                      <td>{this.state.detailReturn.asset_name}</td>
                                    </tr>
                                    <tr>
                                      <td className="pl-3 text-muted text-small">Jenis Barang</td>
                                      <td>{this.state.detailReturn.asset_category_name}</td>
                                    </tr>
                                    <tr>
                                      <td className="pl-3 text-muted text-small">Merk</td>
                                      <td>{this.state.detailReturn.asset_brand}</td>
                                    </tr>
                                    <tr>
                                      <td className="pl-3 text-muted text-small mb-3">Tahun</td>
                                      <td>{this.state.detailReturn.asset_year}</td>
                                    </tr>
                                  </thead>
                                  </Table>
                              </div>
                              <div className="pl-3 pr-5 mb-5">
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
                                      <Label>Alasan Pengembalian</Label>
                                      <FormikReactSelect
                                        name="reactSelect"
                                        id="reactSelect"
                                        value={values.reactSelect}
                                        isMulti={false}
                                        options={options}
                                        onChange={setFieldValue}
                                        onBlur={setFieldTouched}
                                      />
                                    </FormGroup>
                                  </Form>
                                  )}
                                </Formik> 
                              </div>
                                <div className="pr-5 mb-3">
                                <Button className="float-right mb-5" style={{float: 'right'}} size="lg" color="primary" type="submit">
                                    Kembalikan
                                </Button>{" "}
                                <Button className="float-right mb-5" style={{float: 'center'}} size="lg" color="outline-primary" type="button" onClick={() => {}}>
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
export default injectIntl(FormPengembalian);
