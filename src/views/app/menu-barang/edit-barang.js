import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

import FormikEditBarang from "../../../containers/form-validations/FormikEditBarang";

export default class FormEditBarang extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb
              heading="menu.edit-barang"
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" lg="2" className="mb-3"/>
          <Colxx xxs="12" lg="7" className="mb-3">
              <FormikEditBarang />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
