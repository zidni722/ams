import React, { Component, Fragment } from "react";
import { Row, Card, CardBody } from "reactstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import SingleLightbox from "../../../components/pages/SingleLightbox";
import IntlMessages from "../../../helpers/IntlMessages";
import { dataBarang } from "../../../data/barang";


class DetailPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
      const barang = dataBarang.slice(0,1);
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.detail-barang" match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12" xl="5" className="col-left">
                      <Card className="mb-3">
                       {
                          barang.map((itemBarang, index) => {
                            return (
                            <SingleLightbox thumb={itemBarang.thumb} large={itemBarang.thumb} className="responsive card-img-fit" />
                            )
                          }
                          )
                        }
                      </Card>
                    </Colxx>
                    <Colxx xxs="12" xl="7" className="col-right">
                    <Card className="mb-4">
                            <CardBody>
                                {
                                    barang.map((itemBarang, index) => {
                                        return (
                                            <div className={"d-flex flex-row " + (index === barang.length - 1 ? "" : "mb-3")} key={index}>
                                                <div className="pl-3 pt-2 list-item-heading-container">

                                                <p className="text-bold text-large mb-5">
                                                  {itemBarang.title}
                                                </p><br/>                                                

                                                <p className="text-medium font-weight-semibold mb-3">
                                                  <IntlMessages id="OS" />
                                                </p>
                                                <p className="mb-3">
                                                  {itemBarang.os}
                                                </p><br/>

                                                <p className="text-medium font-weight-semibold mb-3">
                                                  <IntlMessages id="Layar" />
                                                </p>
                                                <p className="mb-3">
                                                  {itemBarang.layar}
                                                </p><br/>

                                                <p className="text-medium font-weight-semibold mb-3">
                                                  <IntlMessages id="Prosesor" />
                                                </p>
                                                <p className="mb-3">
                                                  {itemBarang.prosesor}
                                                </p><br/>

                                                <p className="text-medium font-weight-semibold mb-3">
                                                  <IntlMessages id="Penyimpanan" />
                                                </p>
                                                <p className="mb-3">
                                                  {itemBarang.penyimpanan}
                                                </p><br/>

                                                <p className="text-medium font-weight-semibold mb-3">
                                                  <IntlMessages id="Memori" />
                                                </p>
                                                <p className="mb-3">
                                                  {itemBarang.memori}
                                                </p><br/>

                                                <p className="text-medium font-weight-semibold mb-3">
                                                  <IntlMessages id="Grafis" />
                                                </p>
                                                <p className="mb-3">
                                                  {itemBarang.grafis}
                                                </p><br/>
                                                </div>
                                            </div>
                                        )
                                    })
                                  }
                            </CardBody>
                        </Card>
                    </Colxx>
                </Row>
            </Fragment>
        );
    }
}
export default injectIntl(DetailPages);
