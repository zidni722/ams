import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import ReactTable from "react-table";
import IntlMessages from "../../helpers/IntlMessages";
import DataTablePagination from "../../components/DatatablePagination";
import { reactLocalStorage } from 'reactjs-localstorage';
import { convertDate } from "../../helpers/Utils";

const assetHistoryBorrow = reactLocalStorage.getObject('assetHistory').hasOwnProperty('length') ? reactLocalStorage.getObject('assetHistory') : window.location.reload()

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

export const DataPeminjam = props => {
  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle>
          <IntlMessages id="Data Peminjam" />
        </CardTitle>
        <ReactTable
          data={assetHistoryBorrow}
          columns={dataTableColumns}
          defaultPageSize={10}
          showPageJump={false}
          showPageSizeOptions={false}
          PaginationComponent={DataTablePagination}
          className={"react-table-fixed-height"}
        /><br/>
      </CardBody>
    </Card>
  );
};
