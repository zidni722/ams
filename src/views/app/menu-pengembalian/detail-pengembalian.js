import React, { Component, Fragment } from "react";
import { Row, Card, Button, CardBody, CardTitle, DropdownMenu, UncontrolledDropdown, DropdownToggle, DropdownItem, Table, Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import SingleLightbox from "../../../components/pages/SingleLightbox";
import IntlMessages from "../../../helpers/IntlMessages";
import { apiClient } from "../../../helpers/ApiService";
import { me } from "../../../constants/defaultValues";
import SweetAlertCallback from "../../../containers/ui/SweetAlertCallback";
import { reactLocalStorage } from 'reactjs-localstorage';

class DetailPengembalian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailReturn: '',
      detailUser: '',
      isLoading: false
    };
    reactLocalStorage.set('sweetAlertTitle', 'pengembalian')
    reactLocalStorage.set('module-action', 'pengembalian')
  }

  componentDidMount() {
    const returnID = uri => uri.substring(uri.lastIndexOf('/') + 1);
    reactLocalStorage.set('currentReturnID', returnID(window.location.href))

    apiClient.get('/returns/' + returnID(window.location.href))
      .then(res => {
        setTimeout(() => {
          this.setState({ detailReturn: res.data.data })
          this.setState({ isLoading: true })
        }, 100)
      }).catch((e) => {
        console.log(e.message)
      })

    // const userID = uri => uri.substring(uri.lastIndexOf('/') + 1);
    apiClient.get('/users')
      .then(res => {
        this.setState({ detailUser: res.data.data })
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
    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <Row>
            <Colxx xxs="12">
              <Breadcrumb heading="menu.detail-pengembalian" match={this.props.match} />
              {
                me.role_name.toLowerCase() === 'super admin' &&
                this.state.detailReturn.status === "pending" &&
                <SweetAlertCallback />
              }
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row>
            <Colxx xxs="12" lg="6" xl="6" className="col-left">
              <Card className="mb-3">
                <CardBody>
                  <SingleLightbox thumb={this.state.detailReturn.asset_photo ? this.state.detailReturn.asset_photo : "https://res.cloudinary.com/hwqpjijac/image/upload/v1598947378/default-image_vxl2p2.jpg"} large={this.state.detailReturn.asset_photo ? this.state.detailReturn.asset_photo : "https://res.cloudinary.com/hwqpjijac/image/upload/v1598947378/default-image_vxl2p2.jpg"} className="responsive card-img-top" />
                  <p className="text-muted text-small pl-3 pt-5"><IntlMessages id="Kode Barang" /></p>
                  <p className="pl-3">{this.state.detailReturn.asset_code}</p>
                  <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Nama Barang" /></p>
                  <p className="pl-3">{this.state.detailReturn.asset_name}</p>
                  <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Jenis Barang" /></p>
                  <p className="pl-3">{this.state.detailReturn.asset_category_name}</p>
                  <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Merk" /></p>
                  <p className="pl-3">{this.state.detailReturn.asset_brand}</p>
                  <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Tahun" /></p>
                  <p className="pl-3">{this.state.detailReturn.asset_year}</p>
                  <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Status" /></p>
                  <p className="pl-3">{this.state.detailReturn.status}</p>
                </CardBody>

              </Card>
            </Colxx>
            {me.role_name.toLowerCase() == 'super admin' &&
              <Colxx xxs="12" lg="6" xl="6" className="col-right">
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle> Data Peminjam</CardTitle>
                    <div className="text-center">
                      <SingleLightbox thumb={this.state.detailReturn.user_photo} large={this.state.detailReturn.user_photo} className="img-thumbnail border-0 mb-4 list-thumbnail" />
                    </div>
                    <Table borderless>
                      <tr>
                        <td className="text-muted text-small" scope="col">NPK</td>
                        <td scope="col">{this.state.detailReturn.user_code}</td>
                      </tr>
                      <tr>
                        <td className="text-muted text-small" scope="col">Nama</td>
                        <td scope="col">{this.state.detailReturn.user_name}</td>
                      </tr>
                      <tr>
                        <td className="text-muted text-small" scope="col">Email</td>
                        <td scope="col">{this.state.detailReturn.user_email}</td>
                      </tr>
                      <tr>
                        <td className="text-muted text-small" scope="col">Divisi</td>
                        <td scope="col">{this.state.detailReturn.user_division}</td>
                      </tr>
                      <tr>
                        <td className="text-muted text-small" scope="col">No Telpn</td>
                        <td scope="col">{this.state.detailReturn.user_phone}</td>
                      </tr>
                      <tr>
                        <td className="text-muted text-small" scope="col">Alamat</td>
                        <td scope="col">{this.state.detailReturn.user_address}</td>
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
export default injectIntl(DetailPengembalian);