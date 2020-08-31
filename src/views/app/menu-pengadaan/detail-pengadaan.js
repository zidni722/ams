import React, { Component, Fragment } from "react";
import { Row, Card, Progress, Button, CardBody, CardTitle, DropdownMenu, UncontrolledDropdown, DropdownToggle, DropdownItem, Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import SingleLightbox from "../../../components/pages/SingleLightbox";
import IntlMessages from "../../../helpers/IntlMessages";
import { apiClient } from "../../../helpers/ApiService";
import { me } from "../../../constants/defaultValues";
import SweetAlertCallback from "../../../containers/ui/SweetAlertCallback";
import {reactLocalStorage} from 'reactjs-localstorage';

class DetailPeminjaman extends Component {
    constructor(props) {
        super(props);
        this.state = {
          detailProcurement:''
        };
        reactLocalStorage.set('sweetAlertTitle','pengadaan')
        reactLocalStorage.set('module-action', 'pengadaan')
    }

    componentDidMount() {
      const procurementID = uri => uri.substring(uri.lastIndexOf('/') + 1);
      reactLocalStorage.set('currentProcurementID', procurementID(window.location.href));

      apiClient.get('/procurements/' + procurementID(window.location.href))
          .then(res => {
              this.setState({detailProcurement: res.data.data})
          }).catch((e) => {
          console.log(e.message)
      });

      apiClient.get('/users')
          .then(res => {
              this.setState({detailUser: res.data.data})
          }).catch((e) => {
          console.log(e.message)
      });
  }

  editPengadaan = () => {
    window.location.href = "../form-update-pengadaan/" + this.state.detailProcurement.id
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
                    <Breadcrumb heading="menu.detail-pengadaan" match={this.props.match} />
                    {/* <div className="text-zero top-right-button-container">
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
                          <DropdownItem onClick={() => this.editPengadaan()}>
                            <IntlMessages id="Terima"/>
                          </DropdownItem>
                          <DropdownItem onClick={() => this.handleAlert("tolakAlert", true)}>
                            <IntlMessages id="Tolak"/>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div> */}
                    { 
                      me.role_name.toLowerCase() == 'super admin' &&
                      this.state.detailProcurement.status === "pending" &&
                      <SweetAlertCallback/>
                    }
                    <Separator className="mb-5" />
                </Colxx>
              </Row>
              <Row>
                  <Colxx xxs="12" lg="8" xl="8" className="col-left">
                    <Card className="mb-3">
                      <CardBody>
                      <CardTitle> Data Pengadaan Barang</CardTitle>                          
                        <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Nama Barang" /></p>
                        <p className="pl-3">{this.state.detailProcurement.name}</p>
                        <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Jenis Barang" /></p>
                        <p className="pl-3">{this.state.detailProcurement.asset_category_name}</p>
                        <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Merk" /></p>
                        <p className="pl-3">{this.state.detailProcurement.brand}</p>
                        <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Tahun" /></p>
                        <p className="pl-3">{this.state.detailProcurement.year}</p>
                        <p className="text-muted text-small pl-3 pt-2"><IntlMessages id="Deskripsi" /></p>
                        <p className="pl-3">{this.state.detailProcurement.description}</p>
                      </CardBody>
                      </Card>
                  </Colxx>
                  {me.role_name.toLowerCase() == 'super admin' && 
                  <Colxx xxs="12" lg="4" xl="4" className="col-right">  
                    <Card className="mb-4">
                      <CardBody>
                        <CardTitle> Data Pengaju</CardTitle>
                        <div className="text-center">
                        <SingleLightbox thumb={this.state.detailProcurement.user_photo} large={this.state.detailProcurement.user_photo} className="img-thumbnail border-0 mb-4 list-thumbnail" />
                        </div>
                        <Table borderless>
                            <tr>
                              <td className="text-muted text-small" scope="col">NPK</td>
                              <td scope="col">{this.state.detailProcurement.user_code}</td>
                            </tr>
                            <tr>
                              <td className="text-muted text-small" scope="col">Nama</td>
                              <td scope="col">{this.state.detailProcurement.user_name}</td>
                            </tr>
                            <tr>
                              <td className="text-muted text-small" scope="col">Email</td>
                              <td scope="col">{this.state.detailProcurement.user_email}</td>
                            </tr>
                            <tr>
                              <td className="text-muted text-small" scope="col">Divisi</td>
                              <td scope="col">{this.state.detailProcurement.user_division}</td>
                            </tr>
                            <tr>
                              <td className="text-muted text-small" scope="col">No Telpn</td>
                              <td scope="col">{this.state.detailProcurement.user_phone}</td>
                            </tr>
                            <tr>
                              <td className="text-muted text-small" scope="col">Alamat</td>
                              <td scope="col">{this.state.detailProcurement.user_address}</td>
                            </tr>
                          </Table>          
                      </CardBody>
                    </Card>
                  </Colxx>
                  }
              </Row>
          </Fragment>
      );
    }
}
export default injectIntl(DetailPeminjaman);
