import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import ReactTable from "react-table";
import IntlMessages from "../../helpers/IntlMessages";
import DataTablePagination from "../../components/DatatablePagination";
import { convertDate } from "../../helpers/Utils";
import { apiClient } from "../../helpers/ApiService";

export default class TablePeminjamBarang extends React.Component {
  constructor() {
    super()
    this.state = {
      assetHistoryBorrow: {},
      isLoading: false
    }
  }

  componentDidMount() {
    const assetID = uri => uri.substring(uri.lastIndexOf('/') + 1)
    apiClient.get('/assets/' + assetID(window.location.href) + '/history')
      .then(res => {
        if (res.status === 200) {
          setTimeout(() => {
            this.setState({
              assetHistoryBorrow: res.data.data,
              isLoading: true
            })
          }, 300)
        }
      }).catch((e) => {
        console.log(e.message)
      })
  }

  render() {
    const dataTableColumns = [
      {
        Header: "NPK",
        accessor: "user_code",
        Cell: props => <p className="list-item">{props.value}</p>
      },
      {
        Header: "Nama",
        accessor: "user_name",
        Cell: props => <p className="text-small">{props.value}</p>
      },
      {
        Header: "Tanggal peminjaman",
        accessor: "updated_at",
        Cell: props => <p className="text-small">{convertDate(props.value)}</p>
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: props => <p className="text-small">{props.value}</p>
      }
    ];

    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Card className="mb-4">
          <CardBody>
            <CardTitle>
              <IntlMessages id="Data Peminjam" />
            </CardTitle>
            <ReactTable
              data={this.state.assetHistoryBorrow}
              columns={dataTableColumns}
              defaultPageSize={10}
              showPageJump={false}
              showPageSizeOptions={false}
              PaginationComponent={DataTablePagination}
              className={"react-table-fixed-height"}
            /><br />
          </CardBody>
        </Card>
      )
  }
}