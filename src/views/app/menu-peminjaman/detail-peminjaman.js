import React, { Component, Fragment } from "react";
import { Row, Card, Progress, Button, CardBody, CardTitle, DropdownMenu, UncontrolledDropdown, DropdownToggle, DropdownItem, Table } from "reactstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import SingleLightbox from "../../../components/pages/SingleLightbox";
import IntlMessages from "../../../helpers/IntlMessages";
import { dataProducts } from "../../../data/products";
import User from "../../../data/user";



class DetailPeminjaman extends Component {
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
                        <Breadcrumb heading="menu.detail-peminjaman" match={this.props.match} />
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
                                    <td className="text-muted text-small">NPK</td>
                                    <td>{detailUser.npk}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-muted text-small">Nama</td>
                                    <td>{detailUser.name}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-muted text-small">Email</td>
                                    <td>{detailUser.email}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-muted text-small">Divisi</td>
                                    <td>{detailUser.divisi}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-muted text-small">No Telpn</td>
                                    <td>{detailUser.noHP}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-muted text-small">Alamat</td>
                                    <td>{detailUser.address}</td>
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
export default injectIntl(DetailPeminjaman);
