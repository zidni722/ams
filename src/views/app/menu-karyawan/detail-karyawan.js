import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import SingleLightbox from "../../../components/pages/SingleLightbox";
import IntlMessages from "../../../helpers/IntlMessages";
import User from "../../../data/user";


class DetailPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
      const pegawai = User.slice(0,1);
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.detail-karyawan" match={this.props.match} />
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
                              <DropdownItem header>
                                <IntlMessages id="Ubah Status" />
                              </DropdownItem>
                              <DropdownItem >
                                <IntlMessages id="Non Aktif" />
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
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
                      
                    {
                      pegawai.map((detailUser, index) => {
                        return (
                          <SingleLightbox thumb={detailUser.img} large={detailUser.img} className="img-thumbnail card-img social-profile-img" />
                        )
                      }
                      )
                    }
                    <Card className="mb-4">
                    {
                      pegawai.map((detailUser, index) => {
                        return (
                      <CardBody>
                          <div className="position-absolute card-top-buttons">
                            <Button outline color={"black"} className="btn-header-primary-light icon-button">
                              <i className="simple-icon-pencil" />
                            </Button>
                          </div>
                          <div className="text-center pt-4">
                            <p className="list-item-heading pt-2 mb-2">
                              asri
                            </p>
                            <p className="mb-2">
                              asri@pawoon.com
                            </p>
                            <p className="mb-3">
                              <Badge color={detailUser.statusColor} className="mb-1 mr-1" pill>{detailUser.status}</Badge>
                            </p>
                          </div>
                          <p className="text-muted text-small mb-2"><IntlMessages id="NPK" /></p>
                          <p className="mb-3">IT-1</p>
                          <p className="text-muted text-small mb-2"><IntlMessages id="Divisi" /></p>
                          <p className="mb-3">Engineering</p>
                          <p className="text-muted text-small mb-2"><IntlMessages id="No Tlpn" /></p>
                          <p className="mb-3">+62 811 189 991 1</p>
                          <p className="text-muted text-small mb-2"><IntlMessages id="Alamat" /></p>
                          <p className="mb-3">Matraman Raya</p>                          
                      </CardBody>
                        )
                      }
                      )
                    }
                    </Card>
                  </Colxx>
                </Row>
            </Fragment>
        );
    }
}
export default injectIntl(DetailPages);
