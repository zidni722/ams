import React from "react";
import { Card, Badge } from "reactstrap";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import Title from "./ListBarang";
import { Link } from "react-router-dom";


const DataListView = ({ product, isSelect, collect, onCheckItem }) => {
  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
        <Title/>
        <Link
          to="/app/menu-barang/detail-barang" 
          className="card"
        >
        {/* <Card
          onClick={event => onCheckItem(event, product.id)}
          className={classnames("d-flex flex-row mb-3", {
            active: isSelect
          })}
        > */}
          <div className="d-flex flex-grow-1 min-width-zero">
            
            <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
              {/* <NavLink to={`?p=${product.id}`} className="mb-1 text-p text-small w-50"> */}
              <p className="mb-1 text-p text-small w-50">
                <IntlMessages id="No" />
              </p>
              {/* </NavLink> */}
              <p className="mb-1 text-p text-small w-50">
                {product.code}
              </p>
              <p className="mb-1 text-p text-small w-50">
                {product.name}
              </p>
              <p className="mb-1 text-p text-small w-50">
                jenis
              </p>
              <p className="mb-1 text-p text-small w-50">
                merk
              </p>
              <p className="mb-1 text-p text-small w-50">
                tahun
              </p>
              <p className="mb-1 text-p text-small w-50">
                stock
              </p>
            </div>
          </div>
        </Link>
        {/* </Card> */}
      </ContextMenuTrigger>
    </Colxx>
  );
};

export default React.memo(DataListView);