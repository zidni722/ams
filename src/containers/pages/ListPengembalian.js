import React from "react";
import { Row, Card, CardBody, Badge } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import products from "../../data/products";
import IntlMessages from "../../helpers/IntlMessages";

const TitlePengembalian = () => {
  
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
            <IntlMessages id="Nama Peminjam" />
          </p>
          <p className="mb-1 text-p text-small font-weight-semibold w-50">
            <IntlMessages id="Tanggal Pengajuan" />
          </p>
          <p className="mb-1 text-p text-small font-weight-semibold w-50">
            <IntlMessages id="Tanggal Verifikasi" />
          </p>
          <p className="mb-1 text-p text-small font-weight-semibold w-50">
            <IntlMessages id="Status" />
          </p>
        </CardBody>
      </div>
    </Card>
  );
};

const Listpengembalian = ({ id, code, title, category, tenant, createDate, verificationDate, status, statusColor }) => {
  
  return (
    
    <Card onClick = {() => window.location.href="/app/menu-pengembalian/form-pengembalian"} className="btn-shadow d-flex flex-row mb-3">
      <div className="d-flex flex-grow-1 min-width-zero">
        
        <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
          <p className="mb-1 text-p text-small w-50">{code}</p>
          <p className="mb-1 text-p text-small w-50">{title}</p>
          <p className="mb-1 text-p text-small w-50">{category}</p>
          <p className="mb-1 text-p text-small w-50">{tenant}</p>
          <p className="mb-1 text-p text-small w-50">{createDate}</p>
          <p className="mb-1 text-p text-small w-50">{verificationDate}</p>
          
          <div className="mb-1 text-p text-small w-50 text-relative">
            <Badge color={statusColor} pill>
              Dalam Peminjaman
            </Badge>
          </div>
        </CardBody>
      </div>
    </Card>
  );
};

const ListItemPengembalian = () => {
  return (
    <Row>
      <Colxx>
      <TitlePengembalian/>
        {products.map((products, index) => {
          return <Listpengembalian key={`products_${index}`} {...products} />;
        })}
      </Colxx>
    </Row>
  );
};

export default ListItemPengembalian;
