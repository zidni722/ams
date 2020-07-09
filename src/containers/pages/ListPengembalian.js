import React from "react";
import { Row, Card, CardBody, Badge } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import { NavLink } from "react-router-dom";
import products from "../../data/products";
import IntlMessages from "../../helpers/IntlMessages";

const Title = () => {
  
  return (
    <Card className="d-flex flex-row mb-3">   
      <div className="d-flex flex-grow-1 min-width-zero">
        <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center sm">
          <p className="mb-1 text-p text-small font-weight-semibold w-50">
            <IntlMessages id="No" />
          </p>
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
    
    <Card className="d-flex flex-row mb-3">
      <div className="d-flex flex-grow-1 min-width-zero">
        
        <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
        <NavLink
            to="#"
            className="mb-1 text-p text-small w-50"
          >
            {id}
          </NavLink>
          <NavLink
            to="#"
            className="mb-1 text-p text-small w-50"
          >{code}
          </NavLink>
          <NavLink
            to="#"
            className="mb-1 text-p text-small w-50"
          >{title}
          </NavLink>
          <p className="mb-1 text-p text-small w-50">{category}</p>
          <p className="mb-1 text-p text-small w-50">{tenant}</p>
          <p className="mb-1 text-p text-small w-50">{createDate}</p>
          <p className="mb-1 text-p text-small w-50">{verificationDate}</p>
          
          <div className="mb-1 text-p text-small w-50 text-relative">
            <Badge color={statusColor} pill>
              {status}
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
      <Title/>
        {products.map((products, index) => {
          return <Listpengembalian key={`products_${index}`} {...products} />;
        })}
      </Colxx>
    </Row>
  );
};

export default ListItemPengembalian;
