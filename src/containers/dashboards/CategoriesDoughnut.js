import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";

import IntlMessages from "../../helpers/IntlMessages";
import { DoughnutChart } from "../../components/charts"


import { doughnutChartData } from "../../data/charts";
import { reactLocalStorage } from "reactjs-localstorage";
import { me } from "../../constants/defaultValues";



export default class CategoriesDoughnut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: false
    };
  }


  render() {
    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Card className="h-100">
          <CardBody>
            <CardTitle>
              <div className="btn-group float-right float-none-xs mt-2">
                <UncontrolledDropdown>
                  <DropdownToggle color="" className="btn btn-header-light icon-button">
                    <i className="simple-icon-refresh" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={
                      () => {
                        reactLocalStorage.set('module', 'borrows')
                        window.location.reload();
                      }
                    }>
                      <IntlMessages id="Peminjaman" />
                    </DropdownItem>
                    <DropdownItem onClick={
                      () => {
                        reactLocalStorage.set('module', 'returns')
                        window.location.reload();
                      }
                    }>
                      <IntlMessages id="Pengembalian" />
                    </DropdownItem>
                    <DropdownItem onClick={
                      () => {
                        reactLocalStorage.set('module', 'services')
                        window.location.reload();
                      }
                    }>
                      <IntlMessages id="Perbaikan" />
                    </DropdownItem>
                    {
                      me.role_name.toLowerCase() !== 'employee' &&
                      <DropdownItem onClick={
                        () => {
                          reactLocalStorage.set('module', 'procurements')
                          window.location.reload();
                        }
                      }>
                        <IntlMessages id="Pengadaan" />
                      </DropdownItem>
                    }
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>

            </CardTitle>
            <div className="dashboard-donut-chart" >
              <DoughnutChart shadow data={doughnutChartData} />
            </div>
          </CardBody>
        </Card>
      );
  }
}
