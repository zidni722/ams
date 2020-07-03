import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Card, CardBody, CardTitle } from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import IntlMessages from "../../helpers/IntlMessages";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";

import data from "../../data/products";


class BestSellers extends Component {
  constructor() {
    super();
    this.state = {
      selectAll: false,
      data: [],
      checked: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSingleCheckboxChange = this.handleSingleCheckboxChange.bind(
      this
    );
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
            <ReactTable
              data={this.state.data}
              defaultPageSize={5}
              showPageJump={false}
              showPageSizeOptions={false}
              PaginationComponent={Pagination}
              columns={[
                {
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
                }
              ]}
            />
        </CardBody>
      </Card>
    );
  }
}

export default BestSellers;