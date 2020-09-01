import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import IconCardsCarousel from '../../../containers/dashboards/IconCardsCarousel';
import ProductCategoriesDoughnut from '../../../containers/dashboards/ProductCategoriesDoughnut'
import BestSellers from '../../../containers/dashboards/BestSellers'
import IntlMessages from "../../../helpers/IntlMessages";
import Banner from "../../../containers/dashboards/banner";
import {reactLocalStorage} from "reactjs-localstorage";
import {apiClient} from "../../../helpers/ApiService";

export default class Dashboards extends Component {
    componentDidMount() {
        const module = reactLocalStorage.get('module') || 'borrows'

        apiClient.get(`${module}/count-all-status`)
            .then(res => {
                const responseData = res.data.data
                const iconCardsData = [
                    {
                        title: 'Menunggu',
                        icon1: "simple-icon-clock",
                        valueMenunggu: responseData ? responseData.count_pending_status : 0
                    },
                    {
                        title: 'Tolak',
                        icon2: "simple-icon-close",
                        valueTolak: responseData ? responseData.count_reject_status : 0
                    },
                    {
                        title: 'Selesai',
                        icon3: "simple-icon-check",
                        valueSelesai: responseData ? responseData.count_success_status : 0
                    },
                ]

                reactLocalStorage.setObject('iconCardsData', iconCardsData)
            }).catch((e) => {
            console.log(e.message)
        });

        apiClient.get(`/${module}?per_page=5`)
        .then(res => {
          console.log(res.data.data)
          const recentData=res.data.data
          // [
          //   {
          //     Header: "Kode Barang",
          //     accessor: "code",
          //     Cell: props => <p className="text-muted mb-0">{this.state.detailBorrow.asset_code}</p>
          //   },
          //   {
          //     Header: "Nama Barang",
          //     accessor: "title",
          //     Cell: props => <p className="text-muted">{props.value}</p>
          //   },
          //   {
          //     Header: "Tanggal Request",
          //     accessor: "createDate",
          //     Cell: props => <p className="text-muted">{props.value}</p>
          //   },
          //   {
          //     Header: "Status Request",
          //     accessor: "status",
          //     Cell: props => <p className="text-muted">{props.value}</p>
          //   }
          // ]
          reactLocalStorage.setObject(`recent-${module}`, recentData)
        }).catch((e) => {
          console.log(e.message)
        })
    }

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
                <Banner/>
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
