import React, { Component, Fragment } from "react";
import { Row, CardBody, Card} from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

import FormikTambahBarang from "../../../containers/form-validations/FormikTambahBarang";

export default class FormTambahBarang extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb
              heading="menu.form-peminjaman"
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" lg="2" className="mb-3"/>
          <Colxx xxs="12" lg="8" className="mb-3">
              <FormikTambahBarang />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
