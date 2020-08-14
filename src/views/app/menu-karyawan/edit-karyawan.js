import React, {Component, Fragment} from "react";
import {Row} from "reactstrap";
import {Colxx, Separator} from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

import FormikEditKaryawan from "../../../containers/form-validations/FormikEditKaryawan";
import {apiClient} from "../../../helpers/ApiService";

export default class EditKaryawan extends Component {

    componentDidMount() {
        const userID = uri => uri.substring(uri.lastIndexOf('/') + 1);

        apiClient.get('/users/' + userID(window.location.href))
            .then(res => {
                this.setState({detailUser: res.data.data})
            }).catch((e) => {
            console.log(e.message)
        });
    }

    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb
                            heading="menu.edit-karyawan"
                            match={this.props.match}
                        />
                        <Separator className="mb-5"/>
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12" lg="3" className="mb-3"/>
                    <Colxx xxs="12" lg="6" className="mb-3">
                        <FormikEditKaryawan/>
                    </Colxx>
                </Row>
            </Fragment>
        );
    }
}
