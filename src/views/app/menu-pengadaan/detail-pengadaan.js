import React, { Component, Fragment } from "react";
import { Row, Card, Progress, Button, CardBody, CardTitle, DropdownMenu, UncontrolledDropdown, DropdownToggle, DropdownItem, Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import SingleLightbox from "../../../components/pages/SingleLightbox";
import IntlMessages from "../../../helpers/IntlMessages";
import { dataProducts } from "../../../data/products";
import User from "../../../data/user";
import FormikPengadaan from "../../../containers/form-validations/FormikPengadaan";



class DetailPeminjaman extends Component {
    constructor(props) {
        super(props);
        this.state = {
          detailAsset:props.detailAsset,
          modal: false
        };
    }
    detailAsset() {
      console.log(this.state.detailAsset)
    }
    toggle = () => {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    };
    render() {
      const barang = dataProducts.slice(0,1);
      const pegawai = User.slice(0,1);
        return (
            <Fragment>
                <Row>
                <Colxx xxs="12">
                      <Breadcrumb heading="menu.detail-pengadaan" match={this.props.match} />
                      <div className="text-zero top-right-button-container">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            caret
                            color="primary"
                            size="lg"
                            outline
                            className="top-right-button top-right-button-single">
                            <IntlMessages id="ACTIONS" />
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem onClick={this.toggle}>
                              <IntlMessages id="Terima" />
                            </DropdownItem>
                            <DropdownItem >
                              <IntlMessages id="Tolak" />
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                        <div>
                          <Modal isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader toggle={this.toggle}>
                              <IntlMessages id="Apakah anda yakin?" />
                            </ModalHeader>
                            <ModalBody>
                              Apakah anda yakin akan menyetujui pengajuan pengadaan ini?
                            </ModalBody>
                            <ModalFooter>
                              <Button color="primary" onClick={this.toggle}>
                                Yakin
                              </Button>{" "}
                              <Button color="secondary" onClick={this.toggle}>
                                Batal
                              </Button>
                            </ModalFooter>
                          </Modal>
                        </div>
                      </div>
                      <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12" lg="8" xl="8" className="col-left">
                      <FormikPengadaan/>
                    </Colxx>
                    <Colxx xxs="12" lg="4" xl="4" className="col-right">
                         
                    <Card className="mb-4">
                    {
                      pegawai.map((detailUser, index) => {
                        return (
                        <CardBody>
                          <CardTitle> Data Pengaju</CardTitle>
                          <div className="text-center">
                          <SingleLightbox thumb={detailUser.img} large={detailUser.img} className="img-thumbnail border-0 mb-4 list-thumbnail" />
                          </div>
                          <Table borderless>
                                <thead>
                                  <tr>
                                    <td className="text-muted text-small">NPK</td>
                                    <td>{detailUser.npk}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-muted text-small">Nama</td>
                                    <td>{detailUser.name}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-muted text-small">Email</td>
                                    <td>{detailUser.email}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-muted text-small">Divisi</td>
                                    <td>{detailUser.divisi}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-muted text-small">No Telpn</td>
                                    <td>{detailUser.noHP}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-muted text-small">Alamat</td>
                                    <td>{detailUser.address}</td>
                                  </tr>
                                </thead>
                            </Table>          
                        </CardBody>
                        )
                      })
                    }
                    </Card>
                  </Colxx>
                </Row>
            </Fragment>
        );
    }
}
export default injectIntl(DetailPeminjaman);
