import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

import FormikEditProfil from "../../../containers/form-validations/FormikEditProfil";

export default class EditProfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  componentDidMount () {
    setTimeout(()=>{this.setState({ isLoading: true })},200)
  }

  render() {
    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <Row>
            <Colxx xxs="12">
              <Breadcrumb
                heading="menu.edit-profil"
                match={this.props.match}
              />
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row>
            <Colxx xxs="12" lg="3" className="mb-3" />
            <Colxx xxs="12" lg="6" className="mb-3">
              <FormikEditProfil />
            </Colxx>
          </Row>
        </Fragment>
      );
  }
}
