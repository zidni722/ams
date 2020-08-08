import React, { Component, Fragment } from "react";
import { Row, Card, Progress, Button } from "reactstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import SingleLightbox from "../../../components/pages/SingleLightbox";
import IntlMessages from "../../../helpers/IntlMessages";
import { dataProducts } from "../../../data/products";
import { DataPeminjam } from "../../../containers/ui/TablePeminjam";
import Axios from "axios";
import { servicePath, token } from "../../../constants/defaultValues";


const apiUrl = servicePath;

class DetailPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    categoryList() {
      Axios.get(
        `${apiUrl}/assets`,
      {
        headers : {
          Authorization: 'Bearer ' + token
        }
      })
        .then(res => {
          const asset = res.data.data;
          this.setState( {asset} );
        })
    }
    render() {
      const barang = dataProducts.slice(0,1);
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.detail-barang" match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12" lg="5" xl="5" className="col-left">
                      <Card className="mb-3">
                       {
                          barang.map((itemBarang, index) => {
                            return (
                            <div>
                              <SingleLightbox thumb={itemBarang.img} large={itemBarang.img} className="responsive card-img-top" />
                              <div className="position-absolute card-top-buttons">
                                <Button outline color={"white"} className="icon-button">
                                  <i className="simple-icon-pencil" />
                                </Button>
                              </div>
                              <p className="text-muted text-small pl-3 pt-5"><IntlMessages id="Kode Barang" /></p>
                              <p className="pl-3">{itemBarang.code}</p>
                              <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Nama Barang" /></p>
                              <p className="pl-3">{itemBarang.title}</p>
                              <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Jenis Barang" /></p>
                              <p className="pl-3">{itemBarang.category}</p>
                              <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Merk" /></p>
                              <p className="pl-3">{itemBarang.merk}</p>
                              <p className="text-muted text-small pl-3 pt-2 mb-3"><IntlMessages id="Tahun" /></p>
                              <p className="pl-3">{itemBarang.year}</p>
                            </div>
                            )
                          }
                          )
                        }
                          {barang.map((itemBarang, index) => {
                                    return (
                                      <div className="pl-3 pr-3 pt-3 mb-4">
                                        <p className="mb-3">
                                          <IntlMessages id="Stok Barang" />
                                          <span className="float-right text-muted">
                                            {itemBarang.stock}/{itemBarang.total}
                                          </span>
                                        </p>
                                        <Progress value={(itemBarang.stock / itemBarang.total) * 100} className="mb-3" />
                                      </div>
                                    );
                                  })}
                      </Card>
                    </Colxx>
                    <Colxx xxs="12" lg="7" xl="7" className="col-right">
                      <DataPeminjam />
                    </Colxx>
                </Row>
            </Fragment>
        );
    }
}
export default injectIntl(DetailPages);
