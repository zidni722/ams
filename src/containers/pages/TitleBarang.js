import React from "react";
import { Card, CardBody} from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";

const TitleBarang = () => {
  
  return (
    <Card className="d-flex flex-row mb-3">   
      <div className="d-flex flex-grow-1 min-width-zero">
        <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center sm">
          <p className=" mb-1 text-p text-small font-weight-semibold w-50">
            <IntlMessages id="Kode Barang" />
          </p>
          <p className="mb-1 text-p text-small font-weight-semibold w-50">
            <IntlMessages id="Nama Barang" />
          </p>
          <p className="mb-1 text-p text-small font-weight-semibold w-50">
            <IntlMessages id="Jenis Barang" />
          </p>
          <p className="mb-1 text-p text-small font-weight-semibold w-50">
            <IntlMessages id="Merk" />
          </p>
          <p className="mb-1 text-p text-small font-weight-semibold w-50">
            <IntlMessages id="Tahun" />
          </p>
          <p className="mb-1 text-p text-small font-weight-semibold w-50">
            <IntlMessages id="Stok" />
          </p>
        </CardBody>
      </div>
    </Card>
  );
};

export default TitleBarang;
