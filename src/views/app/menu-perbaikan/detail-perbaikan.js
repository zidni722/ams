import React, { Component, Fragment } from "react";
import { Row, Card, Button, CardBody, CardTitle, DropdownMenu, UncontrolledDropdown, DropdownToggle, DropdownItem, Table } from "reactstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import SingleLightbox from "../../../components/pages/SingleLightbox";
import IntlMessages from "../../../helpers/IntlMessages";
import { dataProducts } from "../../../data/products";
import User from "../../../data/user";


class DetailPerbaikan extends Component {
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
            <Card className="mb-4">
              <CardBody>
                <CardTitle>
                  <IntlMessages id="modal.basic" />
                </CardTitle>
                <div>
                  <Button color="primary" outline onClick={this.toggle}>
                    <IntlMessages id="modal.launch-demo-modal" />
                  </Button>
                  <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                      <IntlMessages id="modal.modal-title" />
                    </ModalHeader>
                    <ModalBody>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.toggle}>
                        Do Something
                      </Button>{" "}
                      <Button color="secondary" onClick={this.toggle}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </CardBody>
            </Card>
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.detail-perbaikan" match={this.props.match} />
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
                        </div>
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12" lg="8" xl="8" className="col-left">
                      <Card className="mb-3">
                       {
                          barang.map((itemBarang, index) => {
                            return (
                            <div>
                              <SingleLightbox thumb={itemBarang.img} large={itemBarang.img} className="responsive card-img-top" />
                              
                              <p className="text-muted text-small pl-3 pt-5"><IntlMessages id="Kode Barang" /></p>
                              <p className="pl-3">{itemBarang.code}</p>
                              <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Nama Barang" /></p>
                              <p className="pl-3">{itemBarang.title}</p>
                              <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Jenis Barang" /></p>
                              <p className="pl-3">{itemBarang.category}</p>
                              <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Merk" /></p>
                              <p className="pl-3">{itemBarang.merk}</p>
                              <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Tahun" /></p>
                              <p className="pl-3">{itemBarang.year}</p>
                            </div>
                            )
                          }
                          )
                        }
                      </Card>
                    </Colxx>
                  <Colxx xxs="12" lg="4" xl="4" className="col-right">
                         
                    <Card className="mb-4">
                    {
                      pegawai.map((detailUser, index) => {
                        return (
                        <CardBody>
                          <CardTitle> Data Peminjam</CardTitle>
                          <div className="text-center">
                          <SingleLightbox thumb={detailUser.img} large={detailUser.img} className="img-thumbnail border-0 mb-4 list-thumbnail" />
                          </div>
                          <Table borderless>
                                <thead>
                                  <tr>
                                    <td className="text-muted text-small" scope="col">NPK</td>
                                    <td scope="col">{detailUser.npk}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-muted text-small" scope="col">Nama</td>
                                    <td scope="col">{detailUser.name}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-muted text-small" scope="col">Email</td>
                                    <td scope="col">{detailUser.email}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-muted text-small" scope="col">Divisi</td>
                                    <td scope="col">{detailUser.divisi}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-muted text-small" scope="col">No Telpn</td>
                                    <td scope="col">{detailUser.noHP}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-muted text-small" scope="col">Alamat</td>
                                    <td scope="col">{detailUser.address}</td>
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
export default injectIntl(DetailPerbaikan);
