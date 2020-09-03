import React, { Component, Fragment } from "react";
import { Row, Card, CardBody } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Sortable from "react-sortablejs";
import { reactLocalStorage } from "reactjs-localstorage";
import { apiClient } from "../../helpers/ApiService";

const data = reactLocalStorage.getObject('iconCardsData')

export default class StatusCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true
    };
  }

  componentDidMount() {
  
  }

  render() {
    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <Row>
            <Colxx xxs="12">
              <Sortable className="row icon-cards-row mb-2">
                {                    
                  data ? data.map((item, index) => {
                    return (
                      <Colxx xxs="6" sm="4" md="4" className="mb-4">
                        <Card>
                          <CardBody className="text-center">
                            <i className={`${item.icon}`} />
                            <p className="card-text font-weight-semibold mb-0">
                              {item.title}
                            </p>
                            <p className="lead text-center icon-color3">{item.value}</p>
                          </CardBody>
                        </Card>
                      </Colxx>
                    );
                  }) : window.location.reload()
                }
              </Sortable>
            </Colxx>
          </Row>
        </Fragment>
      );
  }
}
