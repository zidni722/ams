import React, { Component, Fragment } from "react";
import { Row, Card, Button, CardBody, CardTitle, DropdownMenu, UncontrolledDropdown, DropdownToggle, DropdownItem, Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
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
                          <div>
                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                              <ModalHeader toggle={this.toggle}>
                                <IntlMessages id="Apakah anda yakin?" />
                              </ModalHeader>
                              <ModalBody>
                                Apakah anda yakin akan menyetujui pengajuan perbaikan ini?                              
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
                                    <th className="text-muted text-small" scope="col">NPK</th>
                                    <th scope="col">{detailUser.npk}</th>
                                  </tr>
                                  <tr>
                                    <th className="text-muted text-small" scope="col">Nama</th>
                                    <th scope="col">{detailUser.name}</th>
                                  </tr>
                                  <tr>
                                    <th className="text-muted text-small" scope="col">Email</th>
                                    <th scope="col">{detailUser.email}</th>
                                  </tr>
                                  <tr>
                                    <th className="text-muted text-small" scope="col">Divisi</th>
                                    <th scope="col">{detailUser.divisi}</th>
                                  </tr>
                                  <tr>
                                    <th className="text-muted text-small" scope="col">No Telpn</th>
                                    <th scope="col">{detailUser.noHP}</th>
                                  </tr>
                                  <tr>
                                    <th className="text-muted text-small" scope="col">Alamat</th>
                                    <th scope="col">{detailUser.address}</th>
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
