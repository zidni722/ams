import React, { Component, Fragment } from "react";
import {
    Badge,
    Button,
    Card,
    CardBody,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    UncontrolledDropdown
} from "reactstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import SingleLightbox from "../../../components/pages/SingleLightbox";
import IntlMessages from "../../../helpers/IntlMessages";
import { apiClient } from "../../../helpers/ApiService";
import { reactLocalStorage } from "reactjs-localstorage";
import { NotificationManager } from "../../../components/common/react-notifications";

const statusColor = {
    inactive: "outline-menunggu",
    active: "outline-selesai"
}

class DetailKaryawan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailUser: '',
            isLoading: false
        };

    }

    componentDidMount() {
        const userID = uri => uri.substring(uri.lastIndexOf('/') + 1);

        apiClient.get('/users/' + userID(window.location.href))
            .then(async (res) => {
                setTimeout(() => {
                    this.setState({ detailUser: res.data.data })
                    this.setState({ isLoading: true })
                }, 100);
            }).catch((e) => {
                console.log(e.message)
            })
        if (reactLocalStorage.get('isSuccesSubmit') === "true") {
            NotificationManager.success(
                "Anda berhasil merubah data karyawan",
                "Perubahan Data Berhasil",
                1000000000,
                async () => {
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
                                    <DropdownItem>
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
                                            window.location.href = "../edit-karyawan/" + this.state.detailUser.id
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
                                        <Badge color={statusColor[this.state.detailUser.status]} className="mb-1 mr-1"
                                            pill>{this.state.detailUser.status}</Badge>
                                    </p>
                                </div>
                                <p className="text-muted text-small mb-2"><IntlMessages id="NPK" /></p>
                                <p className="mb-3">{this.state.detailUser.code}</p>
                                <p className="text-muted text-small mb-2"><IntlMessages id="Divisi" /></p>
                                <p className="mb-3">{this.state.detailUser.division_name}</p>
                                <p className="text-muted text-small mb-2"><IntlMessages id="Role" /></p>
                                <p className="mb-3">{this.state.detailUser.role_name}</p>
                                <p className="text-muted text-small mb-2"><IntlMessages id="No. Telepon" /></p>
                                <p className="mb-3">{this.state.detailUser.phone}</p>
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

export default injectIntl(DetailKaryawan);
