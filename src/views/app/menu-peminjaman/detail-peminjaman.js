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
import { reactLocalStorage } from 'reactjs-localstorage';

class DetailPeminjaman extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailBorrow: ''
    };
    reactLocalStorage.set('sweetAlertTitle', 'peminjaman')
    reactLocalStorage.set('module-action', 'peminjaman')
  }

  componentDidMount() {
    const borrowID = uri => uri.substring(uri.lastIndexOf('/') + 1);
    reactLocalStorage.set('currentBorrowID', borrowID(window.location.href))

    apiClient.get("/borrows/" + borrowID(window.location.href))
      .then(res => {
        console.log(res.data)
        this.setState({ detailBorrow: res.data.data })
      }).catch((e) => {
        console.log(e.message)
      })
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="menu.detail-peminjaman" match={this.props.match} />
            { 
              me.role_name.toLowerCase() !== 'employee' && 
              this.state.detailBorrow.status === "pending" &&
              <SweetAlertCallback />
            }
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" lg="8" xl="8" className="col-left">
            <Card className="mb-3">
              <CardBody>
                <SingleLightbox thumb={this.state.detailBorrow.asset_photo} large={this.state.detailBorrow.asset_photo} className="responsive card-img-top" />
                <p className="text-muted text-small pl-3 pt-5"><IntlMessages id="Kode Barang" /></p>
                <p className="pl-3">{this.state.detailBorrow.asset_code}</p>
                <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Nama Barang" /></p>
                <p className="pl-3">{this.state.detailBorrow.asset_name}</p>
                <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Jenis Barang" /></p>
                <p className="pl-3">{this.state.detailBorrow.asset_category_name}</p>
                <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Merk" /></p>
                <p className="pl-3">{this.state.detailBorrow.asset_brand}</p>
                <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Tahun" /></p>
                <p className="pl-3">{this.state.detailBorrow.asset_year}</p>
                <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Status" /></p>
                <p className="pl-3">{this.state.detailBorrow.status}</p>
              </CardBody>
            </Card>
          </Colxx>

          {me.role_name.toLowerCase() !== 'employee' &&
            <Colxx xxs="12" lg="4" xl="4" className="col-right">
              <Card className="mb-4">
                <CardBody>
                  <CardTitle> Data Peminjam</CardTitle>
                  <div className="text-center">
                    <SingleLightbox thumb={this.state.detailBorrow.user_photo} large={this.state.detailBorrow.user_photo} className="img-thumbnail border-0 mb-4 list-thumbnail" />
                  </div>
                  <Table borderless>
                    <tr>
                      <td className="text-muted text-small" scope="col">NPK</td>
                      <td scope="col">{this.state.detailBorrow.user_code}</td>
                    </tr>
                    <tr>
                      <td className="text-muted text-small" scope="col">Nama</td>
                      <td scope="col">{this.state.detailBorrow.user_name}</td>
                    </tr>
                    <tr>
                      <td className="text-muted text-small" scope="col">Email</td>
                      <td scope="col">{this.state.detailBorrow.user_email}</td>
                    </tr>
                    <tr>
                      <td className="text-muted text-small" scope="col">Divisi</td>
                      <td scope="col">{this.state.detailBorrow.user_division}</td>
                    </tr>
                    <tr>
                      <td className="text-muted text-small" scope="col">No Telpn</td>
                      <td scope="col">{this.state.detailBorrow.user_phone}</td>
                    </tr>
                    <tr>
                      <td className="text-muted text-small" scope="col">Alamat</td>
                      <td scope="col">{this.state.detailBorrow.user_address}</td>
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