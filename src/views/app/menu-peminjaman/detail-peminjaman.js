import React, { Component, Fragment } from "react";
import { Row, Card, Progress, Button, CardBody, CardTitle, DropdownMenu, UncontrolledDropdown, DropdownToggle, DropdownItem, Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import SingleLightbox from "../../../components/pages/SingleLightbox";
import IntlMessages from "../../../helpers/IntlMessages";
import { dataProducts } from "../../../data/products";
import User from "../../../data/user";



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
                      <Breadcrumb heading="menu.detail-peminjaman" match={this.props.match} />
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
                              Apakah anda yakin akan menyetujui pengajuan peminjaman ini?
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
                          {barang.map((itemBarang, index) => {
                                    return (
                                      <div className="pl-3 pr-3 pt-3 mb-4">
                                        <p className="mb-3">
                                          <IntlMessages id="Stok Barang" />
                                          <span className="float-right text-muted">
                                            {itemBarang.stock}/{itemBarang.total}
                                          </span>
                                        </p>
                                        <Progress value={(itemBarang.stock / itemBarang.total) * 100} className="mb-3" />
                                      </div>
                                    );
                                  })}
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
                                    <th className="text-muted text-small">NPK</th>
                                    <th>{detailUser.npk}</th>
                                  </tr>
                                  <tr>
                                    <th className="text-muted text-small">Nama</th>
                                    <th>{detailUser.name}</th>
                                  </tr>
                                  <tr>
                                    <th className="text-muted text-small">Email</th>
                                    <th>{detailUser.email}</th>
                                  </tr>
                                  <tr>
                                    <th className="text-muted text-small">Divisi</th>
                                    <th>{detailUser.divisi}</th>
                                  </tr>
                                  <tr>
                                    <th className="text-muted text-small">No Telpn</th>
                                    <th>{detailUser.noHP}</th>
                                  </tr>
                                  <tr>
                                    <th className="text-muted text-small">Alamat</th>
                                    <th>{detailUser.address}</th>
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
