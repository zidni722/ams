import React from "react";
import { Row, Card, CardBody} from "reactstrap";
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

const ListBarang = ({ id, code, title, category, merk, year, status, statusColor, stock }) => {
  
  return (
    
    <Card className="d-flex flex-row mb-3">
      <div className="d-flex flex-grow-1 min-width-zero">
        
        <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
          <p className="mb-1 text-p text-small w-50">{id}</p>
          <p className="mb-1 text-p text-small w-50">{code}</p>
          <NavLink
            to="/app/menu-barang/detail-barang"
            className="mb-1 text-p text-small w-50"
          >{title}
          </NavLink>
          <p className="mb-1 text-p text-small w-50">{category}</p>
          <p className="mb-1 text-p text-small w-50">{merk}</p>
          <p className="mb-1 text-p text-small w-50">{year}</p>
          <p className="mb-1 text-p text-small w-50">{stock}</p>
        </CardBody>
      </div>
    </Card>
  );
};

const ListItemBarang = () => {
  return (
    <Row>
      <Colxx>
      <Title/>
        {products.map((products, index) => {
          return <ListBarang key={`products_${index}`} {...products} />;
        })}
      </Colxx>
    </Row>
  );
};

export default ListItemBarang;
