import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import StatusCard from '../../../containers/dashboards/StatusCard';
import CategoriesDoughnut from '../../../containers/dashboards/CategoriesDoughnut'
import BestSellers from '../../../containers/dashboards/BestSellers'
import IntlMessages from "../../../helpers/IntlMessages";
import Banner from "../../../containers/dashboards/banner";
import { reactLocalStorage } from "reactjs-localstorage";
import { apiClient } from "../../../helpers/ApiService";
import { me } from "../../../constants/defaultValues";
import { ThemeColors } from '../../../helpers/ThemeColors';
const colors = ThemeColors();

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
    }

    apiClient.get(`/${module}?per_page=5`)
      .then((res) => {
        const recentData = res.data.data
        reactLocalStorage.setObject(`recent-${module}`, recentData)
      })
      .catch((e) => {
        console.log(e.message)
      })

    apiClient.get(`${module}/count-all-status`)
      .then((res) => {
        reactLocalStorage.remove('iconCardsData')
        setTimeout(() => {
          const responseData = res.data.data
          const done = responseData ? parseInt(responseData.count_success_status) : 0
          const pending = responseData ? parseInt(responseData.count_pending_status) : 0
          const reject = responseData ? parseInt(responseData.count_reject_status) : 0

          const iconCardsData = [
            {
              title: 'Menunggu',
              icon: "simple-icon-clock icon-color3",
              value: pending
            },
            {
              title: 'Tolak',
              icon: "simple-icon-close icon-color1",
              value: reject
            },
            {
              title: 'Selesai',
              icon: "simple-icon-check icon-color2",
              value: done
            },
          ]

          const doughnutData = {
            labels: ['Selesai', 'Tolak', 'Menunggu'],
            datasets: [
              {
                label: '',
                borderColor: [colors.themeColor8, colors.themeColor7, colors.themeColor9],
                backgroundColor: [
                  colors.themeColor8_10,
                  colors.themeColor7_10,
                  colors.themeColor9_10
                ],
                borderWidth: 2,
                data: [done,reject,pending]
              }
            ]
          }

          reactLocalStorage.setObject('iconCardsData', iconCardsData)
          reactLocalStorage.setObject('doughnutData', doughnutData)
          this.setState({ isLoading: true })
          this.setState({ status: iconCardsData })
        }, 300);
      }).catch((e) => {
        console.log(e.message)
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
                  <CategoriesDoughnut />
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
