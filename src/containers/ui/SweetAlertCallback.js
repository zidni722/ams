import React from "react"
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap"
import SweetAlert from 'react-bootstrap-sweetalert';
import IntlMessages from "../../helpers/IntlMessages";
import {reactLocalStorage} from 'reactjs-localstorage';

class BasicSweetCallback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setujuAlert : false,
      tolakAlert : false,  
      confirmsetujuAlert : false,
      confirmtolakAlert : false,  
      cancelAlert : false, 
    };
}

  handleAlert = (state, value) => {
    this.setState({ [state] : value })
  }

  render(){
    return (
      <div className="text-zero top-right-button-container">
        <UncontrolledDropdown>
          <DropdownToggle
            caret
            color="primary"
            size="lg"
            outline
            className="top-right-button top-right-button-single">
            <IntlMessages id="ACTIONS" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => this.handleAlert("setujuAlert", true)}>
              <IntlMessages id="Terima"/>
            </DropdownItem>
            <DropdownItem onClick={() => this.handleAlert("tolakAlert", true)}>
              <IntlMessages id="Tolak"/>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <div>
          <SweetAlert title="Apakah Anda Yakin?" 
            warning
            show={this.state.setujuAlert}
            showCancel
            reverseButtons
            cancelBtnBsStyle="danger"
            confirmBtnText="Ya, saya yakin!"
            cancelBtnText="Batal"
            onConfirm={() => {
              this.handleAlert("basicAlert", false)
              this.handleAlert("confirmsetujuAlert", true)
            }}
            onCancel={() => {
              this.handleAlert("setujuAlert", false)
              this.handleAlert("cancelAlert", false)
            }}
          >
            Anda akan menyetujui {reactLocalStorage.get('sweetAlertTitle')} ini!
          </SweetAlert>

          <SweetAlert success title="Berhasil!" 
            confirmBtnBsStyle="success"
            show={this.state.confirmsetujuAlert} 
            onConfirm={() => {
              this.handleAlert("setujuAlert", false)
              this.handleAlert("confirmsetujuAlert", false)
            }}
          >
              <p className="sweet-alert-text">{reactLocalStorage.get('sweetAlertTitle')} berhasil disetujui.</p>
          </SweetAlert>

          <SweetAlert title="Apakah Anda Yakin?" 
            warning
            show={this.state.tolakAlert}
            showCancel
            reverseButtons
            cancelBtnBsStyle="danger"
            confirmBtnText="Ya, saya yakin!"
            cancelBtnText="Batal"
            onConfirm={() => {
              this.handleAlert("basicAlert", false)
              this.handleAlert("confirmtolakAlert", true)
            }}
            onCancel={() => {
              this.handleAlert("tolakAlert", false)
              this.handleAlert("cancelAlert", false)
            }}
          >
            Anda akan menolak {reactLocalStorage.get('sweetAlertTitle')} ini!
          </SweetAlert>

          <SweetAlert success title="Berhasil!" 
            confirmBtnBsStyle="success"
            show={this.state.confirmtolakAlert} 
            onConfirm={() => {
              this.handleAlert("tolakAlert", false)
              this.handleAlert("confirmtolakAlert", false)
            }}
          >
              <p className="sweet-alert-text">{reactLocalStorage.get('sweetAlertTitle')} ditolak.</p>
          </SweetAlert>

          <SweetAlert error title="Cancelled" 
            confirmBtnBsStyle="success"
            show={this.state.cancelAlert} 
            onConfirm={() =>{
              this.handleAlert("tolakAlert", false)
              this.handleAlert("cancelAlert", false)
            }}
          >
              <p className="sweet-alert-text">
                Your imaginary file is safe :)
              </p>
          </SweetAlert>
        </div>
      </div>
    )
  }
}

export default BasicSweetCallback