import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import IconCardsCarousel from '../../../containers/dashboards/IconCardsCarousel';
import StatusCard from '../../../containers/dashboards/StatusCard';
import ProductCategoriesDoughnut from '../../../containers/dashboards/ProductCategoriesDoughnut'
import BestSellers from '../../../containers/dashboards/BestSellers'
import IntlMessages from "../../../helpers/IntlMessages";
import Banner from "../../../containers/dashboards/banner";
import { reactLocalStorage } from "reactjs-localstorage";
import { apiClient } from "../../../helpers/ApiService";
import { me } from "../../../constants/defaultValues";

const refreshToken = async () => {
  const password = reactLocalStorage.get('_pswrd')
  const url = '/auth/login';

  let paramsLogin = {
    email: me.email,
    password: password
  };

  apiClient.defaults.headers.common['Content-Type'] = 'application/json';

  await apiClient.post(url, paramsLogin).then(async (result) => {
    if (result.status === 200) {
      await Promise.all([
        reactLocalStorage.set('token', result.data.data.token)
      ]);
    }
  })

  await apiClient.get('/notifications?per_page=1000').then((result) => {
    reactLocalStorage.setObject('notifications', result.data)
  })
}

export default class Dashboards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      status: reactLocalStorage.getObject('iconCardsData')
    };
  }

  componentDidMount() {
    const module = reactLocalStorage.get('module') || 'borrows'

    if (reactLocalStorage.get('token') === 'undefined') {
      refreshToken()
    }

    apiClient.get(`/${module}?per_page=5`)
      .then((res) => {
        const recentData = res.data.data
        reactLocalStorage.setObject(`recent-${module}`, recentData)
      })
      .catch((e) => {
        refreshToken()
      })

    apiClient.get(`${module}/count-all-status`)
      .then((res) => {
        reactLocalStorage.remove('iconCardsData')
        setTimeout(() => {
          const responseData = res.data.data
          const iconCardsData = [
            {
              title: 'Menunggu',
              icon: "simple-icon-clock icon-color3",
              value: responseData ? responseData.count_pending_status : 0
            },
            {
              title: 'Tolak',
              icon: "simple-icon-close icon-color1",
              value: responseData ? responseData.count_reject_status : 0
            },
            {
              title: 'Selesai',
              icon: "simple-icon-check icon-color2",
              value: responseData ? responseData.count_success_status : 0
            },
          ]

          reactLocalStorage.setObject('iconCardsData', iconCardsData)
          this.setState({ isLoading: true })
          this.setState({ status: iconCardsData })
        }, 300);
      }).catch((e) => {
        refreshToken()
      });
  }

  render() {
    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <Row>
            <Colxx xxs="12">
              <Breadcrumb heading="menu.dashboards" match={this.props.match} />
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row>
            <Colxx xxs="12" className="mb-4">
              <Banner />
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
              <StatusCard />
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
