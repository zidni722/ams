import React from "react";
import { Card, Badge } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";


const statusColor = {
  pending : "outline-menunggu",
  approved : "outline-selesai",
  rejected : "outline-tolak"
}

const ListPengadaan = ({ procurment }) => {
  return (
      <Colxx xxs="12" className="mb-3" key={procurment.id}>

        <Card onClick={() => {
          window.location.href="./detail-pengadaan/" + procurment.id
        }} >

          <div className="d-flex flex-grow-1 min-width-zero">
            <div className="d-flex flex-grow-1 min-width-zero">
              <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">          
                <p className="mb-1 text-p text-small w-50">{procurment.asset_name}</p>
                <p className="mb-1 text-p text-small w-50">{procurment.asset_category_name}</p>
                <p className="mb-1 text-p text-small w-50">{procurment.user_name}</p>
                <p className="mb-1 text-p text-small w-50">{procurment.created_at}</p>
                <p className="mb-1 text-p text-small w-50">{procurment.updated_at}</p>

                <div className="mb-1 text-p text-small w-50 text-relative">
                  <Badge color={statusColor[procurment.status]} pill>
                    {procurment.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Colxx>
  );
};

export default ListPengadaan;
