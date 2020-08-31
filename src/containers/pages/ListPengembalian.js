import React from "react";
import { Card, Badge } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";


const statusColor = {
  pending : "outline-menunggu",
  approved : "outline-selesai",
  rejected : "outline-tolak"
}

const ListPengembalian = ({ return_ }) => {
  return (
      <Colxx xxs="12" className="mb-3" key={return_.id}>

        <Card onClick={() => {
          window.location.href="./detail-pengembalian/" + return_.id
          }} >
          <div className="d-flex flex-grow-1 min-width-zero">

            <div className="d-flex flex-grow-1 min-width-zero">
              <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">          
                <p className="mb-1 text-p text-small w-50">{return_.asset_code}</p>
                <p className="mb-1 text-p text-small w-50">{return_.asset_name}</p>
                <p className="mb-1 text-p text-small w-50">{return_.asset_category_name}</p>
                <p className="mb-1 text-p text-small w-50">{return_.user_name}</p>
                <p className="mb-1 text-p text-small w-50">{return_.created_at}</p>
                <p className="mb-1 text-p text-small w-50">{return_.updated_at}</p>

                <div className="mb-1 text-p text-small w-50 text-relative">
                  <Badge color={statusColor[return_.status]} pill>
                    {return_.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Colxx>
  );
};

export default ListPengembalian;
