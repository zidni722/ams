import React, { Component, Fragment } from "react";
import { Row, Card, Button, CardBody, CardTitle, DropdownMenu, UncontrolledDropdown, DropdownToggle, DropdownItem, Table, FormGroup, Label } from "reactstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import SingleLightbox from "../../../components/pages/SingleLightbox";
import IntlMessages from "../../../helpers/IntlMessages";
import { dataProducts } from "../../../data/products";
import User from "../../../data/user";
import { FormikReactSelect } from "../../../containers/form-validations/FormikFields";
import { Formik, Form } from "formik";


const options = [
  { value: "software", label: "Software" },
  { value: "hardware", label: "Hardware" }
];

class FormPerbaikan extends Component {
    constructor(props) {
        super(props);
        this.state = {
          detailAsset:props.detailAsset
        };
    }
    detailAsset() {
      console.log(this.state.detailAsset)
    }

    render() {
      const barang = dataProducts.slice(0,1);
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
                       {barang.map((itemBarang, index) => {
                          return (
                          <Card>    
                            <Row>
                              <Colxx xxs="12" sm="6">
                              <CardTitle className="pt-4 pl-4 mb-3">Informasi Perbaikan</CardTitle>
                              <div className="pl-3">
                                <SingleLightbox thumb={itemBarang.img} large={itemBarang.img} className="list-thumbnail-mid responsive border-0 card-img-fit" />
                              </div>
                              </Colxx>
                              <Colxx xxs="12" sm="6">
                              <div className="pt-5 mb-3"><p/>
                                <Table borderless>
                                  <thead>
                                    <tr>
                                      <td className="pl-3 text-muted text-small">Kode</td>
                                      <td>{itemBarang.code}</td>
                                    </tr>
                                    <tr>
                                      <td className="pl-3 text-muted text-small">Nama Barang</td>
                                      <td>{itemBarang.title}</td>
                                    </tr>
                                    <tr>
                                      <td className="pl-3 text-muted text-small">Jenis Barang</td>
                                      <td>{itemBarang.category}</td>
                                    </tr>
                                    <tr>
                                      <td className="pl-3 text-muted text-small">Merk</td>
                                      <td>{itemBarang.merk}</td>
                                    </tr>
                                    <tr>
                                      <td className="pl-3 text-muted text-small mb-3">Tahun</td>
                                      <td>{itemBarang.year}</td>
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
                                    errors,
                                    touched,
                                    isSubmitting
                                  }) => (
                                  <Form className="av-tooltip tooltip-label-right">
                                    <FormGroup className="error-l-100">
                                      <Label>Jenis Kerusakan</Label>
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
                            )}
                          )
                        }
                    </Colxx>
                  </Row>
            </Fragment>
        );
    }
}
export default injectIntl(FormPerbaikan);
