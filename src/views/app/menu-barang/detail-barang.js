import React, { Component, Fragment } from "react";
import { Row, Card, Progress, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import SingleLightbox from "../../../components/pages/SingleLightbox";
import IntlMessages from "../../../helpers/IntlMessages";
import { DataPeminjam } from "../../../containers/ui/TablePeminjam";
import { apiClient } from "../../../helpers/ApiService";
import SweetAlertDelete from "../../../containers/ui/SweetAlertDelete";
import { reactLocalStorage } from 'reactjs-localstorage';
import { me } from "../../../constants/defaultValues";
import { NotificationManager } from "../../../components/common/react-notifications";


class DetailPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailAsset: '',
      isLoading: false
    };
  }
  componentDidMount() {
    const assetID = uri => uri.substring(uri.lastIndexOf('/') + 1);
    apiClient.get('/assets/' + assetID(window.location.href))
      .then(res => {
        this.setState({ detailAsset: res.data.data })
      }).catch((e) => {
        console.log(e.message)
      })
    if (reactLocalStorage.get('isSuccesSubmit') === "true") {
      NotificationManager.success(
        "Anda berhasil merubah data barang",
        "Perubahan Data Berhasil",
        1000000000,
        () => {
          reactLocalStorage.set('isSuccesSubmit', false)
          this.setState({ visible: false });
        },
        null
      );
    }
    setTimeout(() => { this.setState({ isLoading: true }) }, 500)

  }

  editBarang = () => {
    window.location.href = "../edit-barang/" + this.state.detailAsset.id
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
              <Breadcrumb heading="menu.detail-barang" match={this.props.match} />
              {
                me.role_name.toLowerCase() == 'super admin' &&
                <SweetAlertDelete />
              }
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row>
            <Colxx xxs="12" lg="5" xl="5" className="col-left">
              <Card className="mb-3">
                <SingleLightbox thumb={this.state.detailAsset.image} large={this.state.detailAsset.image} className="responsive card-img-top" />
                <div className="position-absolute card-top-buttons">
                  <Button outline color={"white"} className="icon-button" onClick={this.editBarang}>
                    <i className="simple-icon-pencil" />
                  </Button>
                </div>
                <p className="text-muted text-small pl-3 pt-5"><IntlMessages id="Kode Barang" /></p>
                <p className="pl-3">{this.state.detailAsset.code}</p>
                <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Nama Barang" /></p>
                <p className="pl-3">{this.state.detailAsset.name}</p>
                <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Jenis Barang" /></p>
                <p className="pl-3">{this.state.detailAsset.category_name}</p>
                <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Merk" /></p>
                <p className="pl-3">{this.state.detailAsset.brand}</p>
                <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Tahun" /></p>
                <p className="pl-3">{this.state.detailAsset.year}</p>
                <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Harga" /></p>
                <p className="pl-3">{this.state.detailAsset.price}</p>
                <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Deskripsi" /></p>
                <p className="pl-3">{this.state.detailAsset.desc}</p>

                <div className="pl-3 pr-3 pt-3 mb-4">
                  <p className="mb-3">
                    <IntlMessages id="Stok Barang" />
                    <span className="float-right text-muted">
                      {this.state.detailAsset.qty}/{this.state.detailAsset.qty}
                    </span>
                  </p>
                  <Progress value={(this.state.detailAsset.qty / this.state.detailAsset.qty) * 100} className="mb-3" />
                </div>

              </Card>
            </Colxx>
            <Colxx xxs="12" lg="7" xl="7" className="col-right">
              <DataPeminjam />
            </Colxx>
          </Row>
        </Fragment>
      );
  }
}
export default injectIntl(DetailPages);
