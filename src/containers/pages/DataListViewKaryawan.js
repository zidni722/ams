import React from "react";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../components/common/CustomBootstrap";
import { Card, Badge } from "reactstrap";

const statusColor = {
  inactive : "outline-menunggu",
  active : "outline-selesai"
}

const DataListViewKaryawan = ({ karyawan, collect}) => {
  return (
    <Colxx xxs="12" className="mb-3" key={karyawan.id}>
      <ContextMenuTrigger id="menu_id" data={karyawan.id} collect={collect}>
        <Card className="btn-shadow" onClick={() => {
          window.location.href="./detail-karyawan/" + karyawan.id
        }}>
          <div className="d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
              <p className="mb-1 text-p text-small w-50">
                {karyawan.code}
              </p>
              <p className="mb-1 text-p text-small w-50">
                {karyawan.name}
              </p>
              <p className="mb-1 text-p text-small w-50">
                {karyawan.email}
              </p>
              <p className="mb-1 text-p text-small w-50">
                {karyawan.division_name}
              </p>
              <p className="mb-1 text-p text-small w-50">
                {karyawan.role_name}
              </p>
              <div className="mb-1 text-p text-small w-50 text-relative">
                <Badge color={statusColor[karyawan.status]} pill>
                  {karyawan.status}
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

export default React.memo(DataListViewKaryawan);
