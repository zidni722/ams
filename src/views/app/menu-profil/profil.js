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

class UserProfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
          detailUser: ''
        };
    }

    componentDidMount() {
      apiClient.get('/users/' + me.id)
          .then(res => {
            reactLocalStorage.setObject('me', res.data.data);
            this.setState({detailUser: me})          
          }).catch((e) => {
          console.log(e.message)
      });
    }

    render() {
        return (
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
                    <br/>
                  </Colxx>
                  <Colxx xxs="12" lg="5" xl="4" className="mb-5">
                  </Colxx>
                  <Colxx xxs="12" lg="7" xl="4" className="mb-3">
                      
                    <SingleLightbox thumb={me.photo} large={me.photo} className="img-thumbnail card-img social-profile-img" />
                       
                    <Card className="mb-4">

                      <CardBody>
                        <div className="position-absolute card-top-buttons">
                            <Button outline color={"black"} onClick = {() => window.location.href="./edit-profil"} className="btn-header-primary-light icon-button">
                              <i className="simple-icon-pencil" />
                            </Button>
                          </div>
                          <div className="text-center pt-4">
                            <p className="list-item-heading pt-2 mb-2">
                              {me.name}
                            </p>
                            <p className="mb-2">
                              {me.email}
                            </p>
                            <p className="mb-3">
                              <Badge color={me.statusColor} className="mb-1 mr-1" pill>{me.status}</Badge>
                            </p>
                          </div>
                          <p className="text-muted text-small mb-2"><IntlMessages id="NPK" /></p>
                          <p className="mb-3">{me.code}</p>
                          <p className="text-muted text-small mb-2"><IntlMessages id="Divisi" /></p>
                          <p className="mb-3">{me.division_name}</p>
                          <p className="text-muted text-small mb-2"><IntlMessages id="No Tlpn" /></p>
                          <p className="mb-3">{me.phone}</p>
                          <p className="text-muted text-small mb-2"><IntlMessages id="Alamat" /></p>
                          <p className="mb-3">{me.address}</p>                          
                      </CardBody>
                    </Card>
                  </Colxx>
                </Row>
            </Fragment>
        );
    }
}
export default injectIntl(UserProfil);
