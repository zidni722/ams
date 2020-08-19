import React, { Component, Fragment } from "react";
import { Row, Card, Button, CardBody, CardTitle, DropdownMenu, UncontrolledDropdown, DropdownToggle, DropdownItem, Table, Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import SingleLightbox from "../../../components/pages/SingleLightbox";
import IntlMessages from "../../../helpers/IntlMessages";
import { apiClient } from "../../../helpers/ApiService";
import DetailKaryawan from "../menu-karyawan/detail-karyawan";


class DetailPengembalian extends Component {
    constructor(props) {
        super(props);
        this.state = {
          detailAsset:'',
          detailUser:''
        };
    }
    
    componentDidMount() {
      const assetID = uri => uri.substring(uri.lastIndexOf('/') + 1);

      apiClient.get('/assets/' + assetID(window.location.href))
          .then(res => {
              this.setState({detailAsset: res.data.data})
          }).catch((e) => {
          console.log(e.message)
      })

      // const userID = uri => uri.substring(uri.lastIndexOf('/') + 1);
      apiClient.get('/users')
          .then(res => {
              this.setState({detailUser: res.data.data})
          }).catch((e) => {
          console.log(e.message)
      });
    
    }
    toggle = () => {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    };
    render() {
        return (
            <Fragment>
                <Row>
                  <Colxx xxs="12">
                      <Breadcrumb heading="menu.detail-pengembalian" match={this.props.match} />
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
                              Apakah anda yakin akan menyetujui pengajuan pengembalian ini?
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
                        <SingleLightbox thumb={this.state.detailUser.photo} large={this.state.detailUser.photo} className="responsive card-img-top" />
                          
                        <p className="text-muted text-small pl-3 pt-5"><IntlMessages id="Kode Barang" /></p>
                        <p className="pl-3">{this.state.detailAsset.code}</p>
                        <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Nama Barang" /></p>
                        <p className="pl-3">{this.state.detailAsset.name}</p>
                        <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Jenis Barang" /></p>
                        <p className="pl-3">{this.state.detailAsset.category}</p>
                        <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Merk" /></p>
                        <p className="pl-3">{this.state.detailAsset.brand}</p>
                        <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Tahun" /></p>
                        <p className="pl-3">{this.state.detailAsset.year}</p>
                      </Card>
                    </Colxx>
                  <Colxx xxs="12" lg="4" xl="4" className="col-right">
                         
                    <Card className="mb-4">
                      <CardBody>
                        <CardTitle> Data Peminjam</CardTitle>
                        <div className="text-center">
                        <SingleLightbox thumb={this.state.detailUser.photo} large={this.state.detailUser.photo} className="img-thumbnail border-0 mb-4 list-thumbnail" />
                        </div>
                        <Table borderless>
                            <tr>
                              <td className="text-muted text-small" scope="col">NPK</td>
                              <td scope="col">{this.state.detailUser.code}</td>
                            </tr>
                            <tr>
                              <td className="text-muted text-small" scope="col">Nama</td>
                              <td scope="col">{this.state.detailUser.name}</td>
                            </tr>
                            <tr>
                              <td className="text-muted text-small" scope="col">Email</td>
                              <td scope="col">{this.state.detailUser.email}</td>
                            </tr>
                            <tr>
                              <td className="text-muted text-small" scope="col">Divisi</td>
                              <td scope="col">{this.state.detailUser.division_name}</td>
                            </tr>
                            <tr>
                              <td className="text-muted text-small" scope="col">No Telpn</td>
                              <td scope="col">{this.state.detailUser.phone}</td>
                            </tr>
                            <tr>
                              <td className="text-muted text-small" scope="col">Alamat</td>
                              <td scope="col">{this.state.detailUser.address}</td>
                            </tr>
                          </Table>          
                      </CardBody>
                    </Card>
                  </Colxx>
                </Row>
            </Fragment>
        );
    }
}
export default injectIntl(DetailPengembalian);
