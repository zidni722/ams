import React from "react";
import {Card, CardBody, CardTitle, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";

import IntlMessages from "../../helpers/IntlMessages";
import {DoughnutChart} from "../../components/charts"

import {reactLocalStorage} from "reactjs-localstorage";
import {me} from "../../constants/defaultValues";

export default class CategoriesDoughnut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: false,
      chartData: {},
      module: ''
    };
  }

  componentDidMount() {
    const doughnutChartData = reactLocalStorage.getObject('doughnutData');
    let module = reactLocalStorage.get('module');

    setTimeout(() => {
      switch (module) {
        case "borrows":
          module = 'Peminjaman';
          break;
        case "procurements":
          module = 'Pengadaan';
          break;
        case "services":
          module = 'Perbaikan';
          break;
        case "returns":
          module = 'Pengembalian';
          break;
        default:
          break;
      }

      this.setState({isLoading: true, chartData: doughnutChartData, module: module})
    }, 300)
  }

  render() {
    return !this.state.isLoading ? (
        <div className="loading"/>
    ) : (
        <Card className="h-100">
          <CardBody>
            <CardTitle>
              <div className="btn-group float-right float-none-xs mt-2">
                <UncontrolledDropdown>
                  <DropdownToggle color="" className="btn btn-header-light icon-button">
                    <i className="simple-icon-refresh"/>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={
                      () => {
                        reactLocalStorage.set('module', 'borrows');
                        window.location.reload();
                      }
                    }>
                      <IntlMessages id="Peminjaman"/>
                    </DropdownItem>
                    <DropdownItem onClick={
                      () => {
                        reactLocalStorage.set('module', 'returns');
                        window.location.reload();
                      }
                    }>
                      <IntlMessages id="Pengembalian"/>
                    </DropdownItem>
                    <DropdownItem onClick={
                      () => {
                        reactLocalStorage.set('module', 'services');
                        window.location.reload();
                      }
                    }>
                      <IntlMessages id="Perbaikan"/>
                    </DropdownItem>
                    {
                      me.role_name.toLowerCase() !== 'employee' &&
                      <DropdownItem onClick={
                        () => {
                          reactLocalStorage.set('module', 'procurements');
                          window.location.reload();
                        }
                      }>
                        <IntlMessages id="Pengadaan"/>
                      </DropdownItem>
                    }
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
              {this.state.module}
            </CardTitle>
            <div className="dashboard-donut-chart">
              <DoughnutChart shadow data={this.state.chartData}/>
            </div>
          </CardBody>
        </Card>
    );
  }
}
