import React from "react"
import { Card, CardBody } from "reactstrap"
import { me } from "../../constants/defaultValues"


class Banner extends React.Component {
  render() {
    return (
      <Card className="bg-analytics text-white banner-card" color="info">
        <CardBody className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
          <img src="/assets/img/img_left.png" alt="card-img-left" className="img-left" />
          <div className="award-info text-center">
            <h1 className="mb-2 text-white">Selamat datang, <span className="name mr-1">{me.name}</span>!</h1>
            <p className="m-auto mb-0 w-75">
              Bekerjalah dengan tulus dan ikhlash, agar semuanya tidak menjadi beban melainkan berkah.
            </p>
          </div>
          <img src="/assets/img/img_right.png" alt="card-img-right" className="img-right" />


        </CardBody>
      </Card>
    )
  }
}
export default Banner
