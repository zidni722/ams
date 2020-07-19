import React from "react";
import { Row, Card, CardBody, Badge } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import { NavLink } from "react-router-dom";
import user from "../../data/user";
import IntlMessages from "../../helpers/IntlMessages";

const Title = () => {
  
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

const Listpegawai = ({ npk, name, email, divisi, role, status, statusColor }) => {
  
  return (
    
    <Card className="d-flex flex-row mb-3">
      <div className="d-flex flex-grow-1 min-width-zero">
        
        <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
        <NavLink
            to="#"
            className="mb-1 text-p text-small w-50"
          >
            {npk}
          </NavLink>
          <NavLink
            to="#"
            className="mb-1 text-p text-small w-50"
          >{name}
          </NavLink>
          <NavLink
            to="#"
            className="mb-1 text-p text-small w-50"
          >{email}
          </NavLink>
          <p className="mb-1 text-p text-small w-50">{divisi}</p>
          <p className="mb-1 text-p text-small w-50">{role}</p>
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

const ListItemPegawai = () => {
  return (
    <Row>
      <Colxx>
      <Title/>
        {user.map((user, index) => {
          return <Listpegawai key={`user_${index}`} {...user} />;
        })}
      </Colxx>
    </Row>
  );
};

export default ListItemPegawai;
