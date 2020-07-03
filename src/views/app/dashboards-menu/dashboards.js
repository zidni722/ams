import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import IconCardsCarousel from '../../../containers/dashboards/IconCardsCarousel';
import ProductCategoriesDoughnut from '../../../containers/dashboards/ProductCategoriesDoughnut'
import BestSellers from '../../../containers/dashboards/BestSellers'
import IntlMessages from "../../../helpers/IntlMessages";

export default class Dashboards extends Component {
    render() {
        return (
            <Fragment>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="menu.dashboards" match={this.props.match} />
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12" className="mb-4">
                <img alt="Banner" src="/assets/img/banner-dashboard.png" />
              </Colxx>
            </Row>

            <Row>
              <Colxx lg="12" xl="6">
                <h5 className="mb-4">
                  <IntlMessages id="Total Status" />
                </h5>
              </Colxx>
            </Row>
            <Row>
                  <Colxx lg="12" xl="6">
                  <IconCardsCarousel />
                <Row>
                  <Colxx md="12" className="mb-4">
                    <ProductCategoriesDoughnut />
                  </Colxx>
                </Row>
              </Colxx>
              <Colxx lg="12" xl="6" className="mb-4">
                <BestSellers />
              </Colxx>
            </Row>
          </Fragment>
        );
    }
}