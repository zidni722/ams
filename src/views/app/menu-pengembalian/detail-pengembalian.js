import React, { Component, Fragment } from "react";
import { Row, Card, Button, CardBody, CardTitle, DropdownMenu, UncontrolledDropdown, DropdownToggle, DropdownItem, Table } from "reactstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import SingleLightbox from "../../../components/pages/SingleLightbox";
import IntlMessages from "../../../helpers/IntlMessages";
import { dataProducts } from "../../../data/products";
import User from "../../../data/user";


class DetailPengembalian extends Component {
    constructor(props) {
        super(props);
        this.state = {
          detailAsset:props.detailAsset
        };
    }
    detailAsset() {
      console.log(this.state.detailAsset)
    }
    render() {
      const barang = dataProducts.slice(0,1);
      const pegawai = User.slice(0,1);
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.detail-pengembalian" match={this.props.match} />
                        <div className="text-zero top-right-button-container">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              caret
                              color="primary"
                              size="lg"
                              outline
                              className="top-right-button top-right-button-single">
                              <IntlMessages id="Actions" />
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem>
                                <IntlMessages id="Terima" />
                              </DropdownItem>
                              <DropdownItem >
                                <IntlMessages id="Tolak" />
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12" lg="8" xl="8" className="col-left">
                      <Card className="mb-3">
                       {
                          barang.map((itemBarang, index) => {
                            return (
                            <div>
                              <SingleLightbox thumb={itemBarang.img} large={itemBarang.img} className="responsive card-img-top" />
                              
                              <p className="text-muted text-small pl-4 pt-5"><IntlMessages id="Kode Barang" /></p>
                              <p className="pl-4">{itemBarang.code}</p>
                              <p className="text-muted text-small pl-4 pt-2 mb-3"><IntlMessages id="Nama Barang" /></p>
                              <p className="pl-4">{itemBarang.title}</p>
                              <p className="text-muted text-small pl-4 pt-2 mb-3"><IntlMessages id="Jenis Barang" /></p>
                              <p className="pl-4">{itemBarang.category}</p>
                              <p className="text-muted text-small pl-4 pt-2 mb-3"><IntlMessages id="Merk" /></p>
                              <p className="pl-4">{itemBarang.merk}</p>
                              <p className="text-muted text-small pl-4 pt-2 mb-3"><IntlMessages id="Tahun" /></p>
                              <p className="pl-4 mb-5">{itemBarang.year}</p>
                            </div>
                            )
                          }
                          )
                        }
                      </Card>
                    </Colxx>
                  <Colxx xxs="12" lg="4" xl="4" className="col-right">
                         
                    <Card className="mb-4">
                    {
                      pegawai.map((detailUser, index) => {
                        return (
                        <CardBody>
                          <CardTitle> Data Peminjam</CardTitle>
                          <div className="text-center">
                          <SingleLightbox thumb={detailUser.img} large={detailUser.img} className="img-thumbnail border-0 mb-4 list-thumbnail" />
                          </div>
                          <Table borderless>
                                <thead>
                                  <tr>
                                    <td className="text-muted text-small" scope="col">NPK</td>
                                    <td scope="col">{detailUser.npk}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-muted text-small" scope="col">Nama</td>
                                    <td scope="col">{detailUser.name}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-muted text-small" scope="col">Email</td>
                                    <td scope="col">{detailUser.email}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-muted text-small" scope="col">Divisi</td>
                                    <td scope="col">{detailUser.divisi}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-muted text-small" scope="col">No Telpn</td>
                                    <td scope="col">{detailUser.noHP}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-muted text-small" scope="col">Alamat</td>
                                    <td scope="col">{detailUser.address}</td>
                                  </tr>
                                </thead>
                            </Table>          
                        </CardBody>
                        )
                      })
                    }
                    </Card>
                  </Colxx>
                </Row>
            </Fragment>
        );
    }
}
export default injectIntl(DetailPengembalian);