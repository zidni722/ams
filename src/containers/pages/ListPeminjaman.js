import React from "react";
import { Row, Card, CardBody, Badge } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";

const ListPeminjaman = ({ borrow, statusColor }) => {
  return (
      <Colxx xxs="12" className="mb-3" key={borrow.id}>

        <Card onClick={() => {
          window.location.href="./detail-peminjaman/" + borrow.id
          }} >
          <div className="d-flex flex-grow-1 min-width-zero">

            <div className="d-flex flex-grow-1 min-width-zero">
              <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">          <p className="mb-1 text-p text-small w-50">{borrow.asset_code}</p>
                <p className="mb-1 text-p text-small w-50">{borrow.asset_name}</p>
                <p className="mb-1 text-p text-small w-50">{borrow.asset_category_name}</p>
                <p className="mb-1 text-p text-small w-50">{borrow.user_name}</p>
                <p className="mb-1 text-p text-small w-50">{borrow.created_at}</p>
                <p className="mb-1 text-p text-small w-50">{borrow.updated_at}</p>

                <div className="mb-1 text-p text-small w-50 text-relative">
                  <Badge color={statusColor} pill>
                    {borrow.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Colxx>
  );
};

export default ListPeminjaman;
