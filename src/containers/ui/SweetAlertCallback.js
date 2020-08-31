import React from "react"
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap"
import SweetAlert from 'react-bootstrap-sweetalert';
import IntlMessages from "../../helpers/IntlMessages";
import {reactLocalStorage} from 'reactjs-localstorage';
import { apiClient } from "../../helpers/ApiService";
import { NotificationManager } from "../../components/common/react-notifications";

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
            <DropdownItem onClick={() => {
              let module = reactLocalStorage.get('module-action') ? reactLocalStorage.get('module-action') : 'peminjaman'

              if (module === 'pengadaan') {
                window.location.href = "../../../app/menu-pengadaan/form-update-pengadaan/" + reactLocalStorage.get('currentProcurementID')
              } else {
                this.handleAlert("setujuAlert", true)
              }
            }}>
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
              let module = reactLocalStorage.get('module-action') ? reactLocalStorage.get('module-action') : 'peminjaman'
              let uuid = ''
              let path = ''

              switch (module) {
                case 'peminjaman' :
                  uuid = reactLocalStorage.get('currentBorrowID');
                  path = "borrows";
                  break;
                case 'pengembalian' :
                  uuid = reactLocalStorage.get('currentReturnID');
                  path = "returns";
                  break;
                case 'pengadaan' :
                  uuid = reactLocalStorage.get('currentProcurementID');
                  path = "returns";
                  break;
                default: 
                  break;
              }

              if (module === 'peminjaman' || module === 'pengembalian') {
                apiClient.put(`/${path}/` + uuid + '/approve?action=true')
                .then((result) => {
                  if (result.status === 200) {
                    this.handleAlert("basicAlert", false)
                    this.handleAlert("confirmsetujuAlert", true)
                  }
                });    
              } else if (module === 'pengadaan') {
                apiClient.put(`/${path}/` + uuid + '/approve?action=true')
                .then((result) => {
                  if (result.status === 200) {
                    this.handleAlert("basicAlert", false)
                    this.handleAlert("confirmsetujuAlert", true)
                  }
                });   
              }
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
              window.location.reload();
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
              apiClient.put('/borrows/' + reactLocalStorage.get('currentborrowID') + '/approve?action=false')
              .then((result) => {
                if (result.status === 200) {
                  this.handleAlert("basicAlert", false)
                  this.handleAlert("confirmtolakAlert", true)
                }
              });
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
              window.location.reload();
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