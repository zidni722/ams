import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, Badge, Button } from "reactstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import SingleLightbox from "../../../components/pages/SingleLightbox";
import IntlMessages from "../../../helpers/IntlMessages";
import { me } from "../../../constants/defaultValues";
import { apiClient } from "../../../helpers/ApiService";
import { reactLocalStorage } from "reactjs-localstorage";
import { NotificationManager } from "../../../components/common/react-notifications";

class UserProfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailUser: '',
      isLoading: false
    };
  }

  componentDidMount() {
    apiClient.get('/users/' + me.id)
      .then(res => {
        setTimeout(() => {
          this.setState({ detailUser: res.data.data })
          this.setState({ isLoading: true })
        }, 100);
        console.log(me);
      }).catch((e) => {
        console.log(e.message)
      });
    if (reactLocalStorage.get('isSuccesSubmit') === "true") {
      NotificationManager.success(
        "Anda berhasil data profil",
        "Perubahan Data Berhasil",
        1000000000,
        () => {
          reactLocalStorage.set('isSuccesSubmit', false)
          this.setState({ visible: false });
        },
        null
      );
    }
  }

  render() {
    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <Row>
            <Colxx xxs="12">
              <Breadcrumb heading="menu.profil" match={this.props.match} />
              <div className="text-zero top-right-button-container"></div>
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row>
            <Colxx xxs="12" className="mb-5">
              <br />
            </Colxx>
            <Colxx xxs="12" lg="5" xl="4" className="mb-5">
            </Colxx>
            <Colxx xxs="12" lg="7" xl="4" className="mb-3">

              <SingleLightbox thumb={this.state.detailUser.photo} large={this.state.detailUser.photo} className="img-thumbnail card-img social-profile-img" />

              <Card className="mb-4">

                <CardBody>
                  <div className="position-absolute card-top-buttons">
                    <Button outline color={"black"}
                      className="btn-header-primary-light icon-button"
                      onClick={() => {
                        window.location.href = "./edit-profil"
                        console.log(me);
                      }}
                    >
                      <i className="simple-icon-pencil" />
                    </Button>
                  </div>
                  <div className="text-center pt-4">
                    <p className="list-item-heading pt-2 mb-2">
                      {this.state.detailUser.name}
                    </p>
                    <p className="mb-2">
                      {this.state.detailUser.email}
                    </p>
                    <p className="mb-3">
                      <Badge color="outline-selesai" className="mb-1 mr-1" pill>{this.state.detailUser.status}</Badge>
                    </p>
                  </div>
                  <p className="text-muted text-small mb-2"><IntlMessages id="NPK" /></p>
                  <p className="mb-3">{this.state.detailUser.code}</p>
                  <p className="text-muted text-small mb-2"><IntlMessages id="Divisi" /></p>
                  <p className="mb-3">{this.state.detailUser.division_name}</p>
                  <p className="text-muted text-small mb-2"><IntlMessages id="No Tlpn" /></p>
                  <p className="mb-3">{this.state.detailUser.phone}</p>
                  <p className="text-muted text-small mb-2"><IntlMessages id="Provinsi" /></p>
                  <p className="mb-3">{this.state.detailUser.province_name}</p>
                  <p className="text-muted text-small mb-2"><IntlMessages id="Kota" /></p>
                  <p className="mb-3">{this.state.detailUser.city_name}</p>
                  <p className="text-muted text-small mb-2"><IntlMessages id="Alamat" /></p>
                  <p className="mb-3">{this.state.detailUser.address}</p>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
        </Fragment>
      );
  }
}
export default injectIntl(UserProfil);
