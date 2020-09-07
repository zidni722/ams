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

// const convertModuleToIndo = (module) => {
//   let moduleIndo = ''

//   switch (module) {
//     case 'borrows':
//       moduleIndo = 'Peminjaman'
//       break;
//     case 'returns':
//       moduleIndo = 'Pengembalian'
//       break;
//     case 'services':
//       moduleIndo = 'Perbaikan'
//       break;
//     case 'procurements':
//       moduleIndo = 'Pengadaan'
//       break;
//     default:
//       break;
//   }

//   return moduleIndo
// }

export default class CategoriesDoughnut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: false
    };
  }

  render() {
  const CategoriesDoughnut = (controls = true) => {

      return (
        <Card className="h-100">
          <CardBody>
            <CardTitle>
              {/* <IntlMessages id={`Status ${convertModuleToIndo(reactLocalStorage.get('module'))}`} /> */}
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
              )}
            </CardTitle>
            <div className="dashboard-donut-chart" >
              <DoughnutChart shadow data={doughnutChartData} />
            </div>
          </CardBody>
        </Card>
      );
    }
  }
}