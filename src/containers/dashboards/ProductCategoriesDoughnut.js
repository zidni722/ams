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
import {DoughnutChart} from "../../components/charts"


import { doughnutChartData } from "../../data/charts";
import {reactLocalStorage} from "reactjs-localstorage";

const ProductCategoriesDoughnut = (controls = true) => {
  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle>
        <IntlMessages id="Status Peminjaman" />
        {controls && (
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
                  <IntlMessages id="Peminjaman"/>
                </DropdownItem>
              <DropdownItem onClick={
                  () => {
                    reactLocalStorage.set('module', 'returns')
                    window.location.reload();
                  }
                }>
                  <IntlMessages id="Pengembalian"/>
                </DropdownItem>
                <DropdownItem onClick={
                  () => {
                    reactLocalStorage.set('module', 'services')
                    window.location.reload();
                  }
                }>
                  <IntlMessages id="Perbaikan" />
                </DropdownItem>
                <DropdownItem onClick={
                  () => {
                    reactLocalStorage.set('module', 'procurements')
                    window.location.reload();
                  }
                }>
                  <IntlMessages id="Pengadaan" />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )}
        </CardTitle>
        <div className="dashboard-donut-chart" >
          <DoughnutChart shadow data={doughnutChartData} />
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCategoriesDoughnut;
