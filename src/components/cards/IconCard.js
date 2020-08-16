import React from "react";
import { Card, CardBody } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";

const IconCard = ({className="mb-4", icon1, icon2, icon3, title, valueMenunggu, valueTolak, valueSelesai }) => {
  return (
    <div className={`icon-row-item ${className}`}>
      <Card>
        <CardBody className="lead text-center">
          <i className={`icon-color3 ${icon1}`}/>
          <i className={`icon-color1 ${icon2}`}/>
          <i className={`icon-color2 ${icon3}`}/>
          
          <p className="card-text font-weight-semibold mb-0">
            <IntlMessages id={title} />
          </p>
          <p className="lead text-center icon-color3">{valueMenunggu}</p>
          <p className="lead text-center icon-color1">{valueTolak}</p>
          <p className="lead text-center icon-color2">{valueSelesai}</p>

        </CardBody>
      </Card>
    </div>
  );
};

export default IconCard;