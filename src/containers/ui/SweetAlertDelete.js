import React from "react"
import SweetAlert from 'react-bootstrap-sweetalert';
import {reactLocalStorage} from 'reactjs-localstorage';
import { Button } from "reactstrap";

class BasicSweetDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultAlert : false, 
      confirmAlert : false, 
      cancelAlert : false,
    };
}

  handleAlert = (state, value) => {
    this.setState({ [state] : value })
  }

  render(){
    return (
      <div className="text-zero top-right-button-container">
        <Button  
          className="mr-1 mb-1" 
          color="primary"
          size="lg" 
          onClick={() => this.handleAlert("defaultAlert", true)} primary>Hapus Barang</Button>

        {/* <UncontrolledDropdown>
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
        </UncontrolledDropdown> */}
        <div>
        <SweetAlert title="Apakah Anda Yakin?" 
          warning
          show={this.state.defaultAlert}
          showCancel
          reverseButtons
          cancelBtnBsStyle="danger"
          confirmBtnText="Ya, saya yakin!"
          cancelBtnText="Batal"
          onConfirm={() => {
            this.handleAlert("basicAlert", false)
            this.handleAlert("confirmAlert", true)
          }}
          onCancel={() => {
            this.handleAlert("defaultAlert", false)
            this.handleAlert("cancelAlert", false)
          }}
        >
          Anda akan menghapus barang ini!
        </SweetAlert>

        <SweetAlert success title="Terhapus!" 
          confirmBtnBsStyle="success"
          show={this.state.confirmAlert} 
          onConfirm={() => {
            this.handleAlert("defaultAlert", false)
            this.handleAlert("confirmAlert", false)
          }}
        >
            <p className="sweet-alert-text">Barang berhasil dihapus.</p>
        </SweetAlert>

        <SweetAlert error title="Cancelled" 
          confirmBtnBsStyle="success"
          show={this.state.cancelAlert} 
          onConfirm={() =>{
            this.handleAlert("defaultAlert", false)
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

export default BasicSweetDelete