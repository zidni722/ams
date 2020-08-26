import React from "react";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { Card } from "reactstrap";


const DataListViewPeminjaman = ({ product, collect }) => {
  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
        <Card className="btn-shadow" onClick={() => {
          window.location.href="/app/menu-barang/detail-barang/" + product.id
          }}>
          
          <div className="d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
              <p className="mb-1 text-p text-small w-50">
                <IntlMessages id="No" />
              </p>
              <p className="mb-1 text-p text-small w-50">
                {product.code}
              </p>
              <p className="mb-1 text-p text-small w-50">
                {product.name}
              </p>
              <p className="mb-1 text-p text-small w-50">
                {product.category}
              </p>
              <p className="mb-1 text-p text-small w-50">
                {product.brand}
              </p>
              <p className="mb-1 text-p text-small w-50">
                {product.year}
              </p>
              <p className="mb-1 text-p text-small w-50">
                {product.qty}
              </p>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

export default React.memo(DataListViewPeminjaman);