import React, { Component, Fragment } from "react";
import { Row, Card, Button, CardBody, CardTitle, DropdownMenu, UncontrolledDropdown, DropdownToggle, DropdownItem, Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import SingleLightbox from "../../../components/pages/SingleLightbox";
import IntlMessages from "../../../helpers/IntlMessages";
import { apiClient } from "../../../helpers/ApiService";
import { me } from "../../../constants/defaultValues";
import SweetAlertCallback from "../../../containers/ui/SweetAlertCallback";
import {reactLocalStorage} from 'reactjs-localstorage';

class DetailPerbaikan extends Component {
    constructor(props) {
      super(props);
      this.state = {
        detailService:''
      };
      reactLocalStorage.set('sweetAlertTitle','perbaikan')
      reactLocalStorage.set('module-action', 'perbaikan')
    }

    componentDidMount() {
      const serviceID = uri => uri.substring(uri.lastIndexOf('/') + 1);

      apiClient.get('/services/' + serviceID(window.location.href))
          .then(res => {
              this.setState({detailService: res.data.data})
          }).catch((e) => {
          console.log(e.message)
      });
  }
    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.detail-perbaikan" match={this.props.match} />
                        { 
                          me.role_name.toLowerCase() == 'super admin' &&
                          <SweetAlertCallback/>
                        }
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12" lg="8" xl="8" className="col-left">
                      <Card className="mb-3">
                          <SingleLightbox thumb={this.state.detailService.asset_photo || null} large={this.state.detailService.asset_photo || null} className="responsive card-img-top" />
                          
                          <p className="text-muted text-small pl-3 pt-5"><IntlMessages id="Kode Barang" /></p>
                          <p className="pl-3">{this.state.detailService.asset_code}</p>
                          <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Nama Barang" /></p>
                          <p className="pl-3">{this.state.detailService.asset_name}</p>
                          <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Jenis Barang" /></p>
                          <p className="pl-3">{this.state.detailService.asset_category_name}</p>
                          <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Merk" /></p>
                          <p className="pl-3">{this.state.detailService.asset_brand}</p>
                          <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Tahun" /></p>
                          <p className="pl-3">{this.state.detailService.asset_year}</p>
                      </Card>
                    </Colxx>
                    
                    {me.role_name.toLowerCase() == 'super admin' && 
                    <Colxx xxs="12" lg="4" xl="4" className="col-right"> 
                      <Card className="mb-4">
                        <CardBody>
                          <CardTitle> Data Peminjam</CardTitle>
                            <div className="text-center">
                              <SingleLightbox thumb={this.state.detailService.user_photo} large={this.state.detailService.user_photo} className="img-thumbnail border-0 mb-4 list-thumbnail" />
                            </div>
                          <Table borderless>
                            <thead>
                              <tr>
                                <td className="text-muted text-small" scope="col">NPK</td>
                                <td scope="col">{this.state.detailService.user_code}</td>
                              </tr>
                              <tr>
                                <td className="text-muted text-small" scope="col">Nama</td>
                                <td scope="col">{this.state.detailService.user_name}</td>
                              </tr>
                              <tr>
                                <td className="text-muted text-small" scope="col">Email</td>
                                <td scope="col">{this.state.detailService.user_email}</td>
                              </tr>
                              <tr>
                                <td className="text-muted text-small" scope="col">Divisi</td>
                                <td scope="col">{this.state.detailService.user_division}</td>
                              </tr>
                              <tr>
                                <td className="text-muted text-small" scope="col">No Telpn</td>
                                <td scope="col">{this.state.detailService.user_phone}</td>
                              </tr>
                              <tr>
                                <td className="text-muted text-small" scope="col">Alamat</td>
                                <td scope="col">{this.state.detailService.user_address}</td>
                              </tr>
                            </thead>
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
export default injectIntl(DetailPerbaikan);
