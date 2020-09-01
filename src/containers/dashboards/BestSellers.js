import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Card, CardBody, CardTitle } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";

import data from "../../data/products";
import { reactLocalStorage } from "reactjs-localstorage";
import { apiClient } from "../../helpers/ApiService";
import { Table } from "reactstrap";


class BestSellers extends Component {
  constructor() {
    super();
    this.state = {
      selectAll: false,
      data: [],
      checked: [],
      detailBorrow: '',
      detailUser: '',
      dataTable: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSingleCheckboxChange = this.handleSingleCheckboxChange.bind(this);
    reactLocalStorage.set('module-action', 'pengembalian')
    reactLocalStorage.set('module-action', 'peminjaman')
  }

  handleChange = () => {
    var selectAll = !this.state.selectAll;
    this.setState({ selectAll: selectAll });
    var checkedCopy = [];
    this.state.data.forEach(function (e, index) {
      checkedCopy.push(selectAll);
    });
    this.setState({
      checked: checkedCopy
    }, () => {
      console.log(this.state.checked);
    });
  };

  handleSingleCheckboxChange = index => {
    console.log(index);
    var checkedCopy = this.state.checked;
    checkedCopy[index] = !this.state.checked[index];
    if (checkedCopy[index] === false) {
      this.setState({ selectAll: false });
    }
    this.setState({
      checked: checkedCopy
    }, () => {
      console.log(this.state.checked);
    });
  };

  componentDidMount() {
    let module = reactLocalStorage.get('module')
    // console.log(module);
    // console.log("TYandaa");
    let recentDatas = reactLocalStorage.getObject(`recent-${module}`)
// console.log(recentDatas);
    this.setState({ dataTable: recentDatas})
   
      console.log('this.state.dataTable'); 
      console.log(this.state.dataTable); 
    const dataEdited = data.slice(0, 12);
    var checkedCopy = [];
    var selectAll = this.state.selectAll;
    dataEdited.forEach(function (e, index) {
      checkedCopy.push(selectAll);
    });

    this.setState({
      data: dataEdited,
      checked: checkedCopy,
      selectAll: selectAll
    });
  }

  render(controls = true) {
    return (
      <Card className="h-100">
        <CardBody>
          <CardTitle>
            <IntlMessages id={"Riwayat Terbaru"} />
            {controls && (
              <div className="btn-group float-right float-none-xs mt-2">
                <UncontrolledDropdown>
                  <DropdownToggle color="" className="btn btn-header-light icon-button">
                  <i className="simple-icon-refresh" />
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
            {/* <ReactTable
              data={this.state.dataTable}
              defaultPageSize={5}
              showPagination = {false}
              columns={[{
                Header: "Kode Barang",
                accessor: "code",
                Cell: props => <p className="text-muted mb-0">{props.value}</p>
              },
              {
                Header: "Nama Barang",
                accessor: "title",
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Tanggal Request",
                accessor: "createDate",
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Status Request",
                accessor: "status",
                Cell: props => <p className="text-muted">{props.value}</p>
              }]}
            /> */}
            <Table hover>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Kode</th>
                      <th>Nama Barang</th>
                      <th>Tanggal</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.dataTable && this.state.dataTable.map(( listValue, index ) => {
                      return (
                        <tr>
                          <th scope="row">{index+1}</th>
                          <td>{listValue.asset_code}</td>
                          <td>{listValue.asset_name}</td>
                          <td>{listValue.created_at}</td>
                          <td>{listValue.status}</td>
                       </tr>
                      );
                    })
                  }
                  </tbody>
                </Table>
        </CardBody>
      </Card>
    );
  }
}

export default BestSellers;