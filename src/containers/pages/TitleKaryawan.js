import React from "react";
import { Card, CardBody } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";

const TitleKaryawan = () => {
  
  return (
    <Card className="d-flex flex-row mb-3">   
      <div className="d-flex flex-grow-1 min-width-zero">
        <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center sm">
          <p className="mb-1 text-p text-small font-weight-semibold w-50">
            <IntlMessages id="NPK" />
          </p>
          <p className=" mb-1 text-p text-small font-weight-semibold w-50">
            <IntlMessages id="Nama Pegawai" />
          </p>
          <p className="mb-1 text-p text-small font-weight-semibold w-50">
            <IntlMessages id="Email" />
          </p>
          <p className="mb-1 text-p text-small font-weight-semibold w-50">
            <IntlMessages id="Divisi" />
          </p>
          <p className="mb-1 text-p text-small font-weight-semibold w-50">
            <IntlMessages id="Role" />
          </p>
          <p className="mb-1 text-p text-small font-weight-semibold w-50">
            <IntlMessages id="Status" />
          </p>
        </CardBody>
      </div>
    </Card>
  );
};

export default TitleKaryawan;