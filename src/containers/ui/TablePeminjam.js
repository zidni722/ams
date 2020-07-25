import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import ReactTable from "react-table";
import IntlMessages from "../../helpers/IntlMessages";
import DataTablePagination from "../../components/DatatablePagination";

import User from "../../data/user";


const dataTableColumns = [
  {
    Header: "NPK",
    accessor: "npk",
    Cell: props => <p className="list-item">{props.value}</p>
  },
  {
    Header: "Nama",
    accessor: "name",
    Cell: props => <p className="text-small">{props.value}</p>
  },
  {
    Header: "Tanggal peminjaman",
    accessor: "joiningDate",
    Cell: props => <p className="text-small">{props.value}</p>
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
          data={User}
          columns={dataTableColumns}
          defaultPageSize={5}
          showPageJump={false}
          showPageSizeOptions={false}
          PaginationComponent={DataTablePagination}
          className={"react-table-fixed-height"}
        /><br/>
      </CardBody>
    </Card>
  );
};
