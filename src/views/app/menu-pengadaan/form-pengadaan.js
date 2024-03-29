import React, { Component, Fragment } from "react";
import { Row} from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

import FormikPengadaan from "../../../containers/form-validations/FormikPengadaan";

export default class FormPengadaan extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb
              heading="menu.form-pengadaan"
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" lg="3" className="mb-3"/>
          <Colxx xxs="12" lg="6" className="mb-3">
            <FormikPengadaan />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
