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

const ProductCategoriesDoughnut = (controls = true) => {
  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle>
        <IntlMessages id="Status Peminjaman" />
        {controls && (
          <div className="btn-group float-right float-none-xs mt-2">
            <UncontrolledDropdown>
              <DropdownToggle caret color="primary" className="btn-xs" outline>
                <IntlMessages id="Peminjaman" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <IntlMessages id="Pengembalian" />
                </DropdownItem>
                <DropdownItem>
                  <IntlMessages id="Perbaikan" />
                </DropdownItem>
                <DropdownItem>
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
