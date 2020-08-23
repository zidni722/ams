import React, { Component } from "react";
import ReactDOM from "react-dom"
import {
  Row,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Collapse,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Input,
  CustomInput,
  ModalFooter
} from "reactstrap";
import { injectIntl } from "react-intl";

import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../navs/Breadcrumb";
import IntlMessages from "../../helpers/IntlMessages";
import { Link } from "react-router-dom";
import XLSX from "xlsx"
import * as FileSaver from "file-saver"
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { apiClient } from "../../helpers/ApiService";

class ListPageHeadingBarang extends Component {
  constructor(props) {
    super();
    this.state = {
      dropdownSplitOpen: false,
      displayOptionsIsOpen: false,
      filteredData: [],
      value: "",
      modal: false,
      fileName: "",
      fileFormat: "xlsx"
    };
  }

  toggleDisplayOptions = () => {
    this.setState(prevState => ({
      displayOptionsIsOpen: !prevState.displayOptionsIsOpen
    }));
  };
  toggleSplit =()=> {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  }
  toggleModal = () => {
    this.setState({ modal: !this.state.modal })
  }

  handleExport = () => {
    this.toggleModal()
    let table = ReactDOM.findDOMNode(this.tableRef)
    let bookType = this.state.fileFormat.length ? this.state.fileFormat : "xlsx"
    let wb = XLSX.utils.table_to_book(table, { sheet: "Sheet JS" })
    let wbout = XLSX.write(wb, { bookType, bookSST: true, type: "binary" })

    const s2ab = s => {
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff
      return buf
    }
    let file =
      this.state.fileFormat.length && this.state.fileFormat.length
        ? `${this.state.fileName}.${this.state.fileFormat}`
        : this.state.fileName.length
        ? `${this.state.fileName}.xlsx`
        : this.state.fileFormat.length
        ? `excel-sheet.${this.state.fileFormat}`
        : "excel-sheet.xlsx"

    return FileSaver.saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      file
    )
  }

  generatePDF = () => {
    try {
      apiClient.get('/assets')
            .then(res => {
                const assets = res.data.data
                const doc = new jsPDF('p', 'pt')

                let body = []

                for(const asset of assets) {
                  let data = []

                  data.push(asset.code)
                  data.push(asset.name) 
                  data.push(asset.category) 
                  data.push(asset.brand)
                  data.push(asset.year)
                  data.push(asset.qty)
                  body.push(data)
                }

                doc.autoTable({ html: '#my-table' })
                doc.autoTable({
                  head: [['Kode Barang', 'Nama Barang', 'Jenis Barang', 'Merek', 'Tahun','Jumlah']],
                  body: body,
                })

                doc.save(`asset-report-${Date.now()}.pdf`)
            }).catch((e) => {
            console.log(e.message)
        });
    } catch(e){

    }
    
  }

  render() {
    const { messages } = this.props.intl;
    const {
      changeOrderBy,
      changePageSize,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      match,
      startIndex,
      endIndex,
      onSearchKey,
      orderOptions,
      pageSizes,
      heading
    } = this.props;

    const { displayOptionsIsOpen } = this.state;
    return (
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id={heading} />
            </h1>
            
            <div className="text-zero top-right-button-container">
              <Link 
                to="/app/menu-barang/form-tambah-barang" 
                className="btn btn-lg btn-primary">
                Tambah Barang
              </Link>
            <div className="position-relative d-none d-none d-lg-inline-block">
              <a
                className="btn btn-outline-primary btn-sm ml-2"
                target="_top"
                onClick={this.generatePDF}
              >
              <i className="simple-icon-cloud-download"/>
              </a>
            </div>
            </div>
            <Breadcrumb match={match} />
          </div>

          <div className="mb-2">
            <Button
              color="empty"
              className="pt-0 pl-0 d-inline-block d-md-none"
              onClick={this.toggleDisplayOptions}
            >
              <IntlMessages id="pages.display-options" />{" "}
              <i className="simple-icon-arrow-down align-middle" />
            </Button>
            <Collapse
              isOpen={displayOptionsIsOpen}
              className="d-md-block"
              id="displayOptions">

              <div className="d-block d-md-inline-block pt-1">
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                  <DropdownToggle caret color="outline-dark" size="xs">
                    <IntlMessages id="Sort by : " />
                    {selectedOrderOption.label}
                  </DropdownToggle>
                  <DropdownMenu>
                    {orderOptions.map((ListBarang, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => changeOrderBy(ListBarang.products)}
                        >
                          {ListBarang.label}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="keyword"
                    id="search"
                    placeholder={messages["menu.search"]}
                    onKeyPress={e => onSearchKey(e)}
                  />
                </div>
              </div>
              <div className="float-md-right pt-1">
                <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex} of ${totalItemCount} `}</span>
                <UncontrolledDropdown className="d-inline-block">
                  <DropdownToggle caret color="outline-dark" size="xs">
                    {selectedPageSize}
                  </DropdownToggle>
                  <DropdownMenu right>
                    {pageSizes.map((size, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => changePageSize(size)}
                        >
                          {size}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </Collapse>
          </div>
          <Separator className="mb-5" />
        </Colxx>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered">
          <ModalHeader toggle={this.toggleModal}>Export To Excel</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Input
                type="text"
                value={this.state.fileName}
                onChange={e => this.setState({ fileName: e.target.value })}
                placeholder="Enter File Name"
              />
            </FormGroup>
            <FormGroup>
              <CustomInput
                type="select"
                id="selectFileFormat"
                name="customSelect"
                value={XLSX}
                onChange={e => this.setState({ fileFormat: e.target.value })}>
                <option>xlsx</option>
                <option>csv</option>
                <option>txt</option>
              </CustomInput>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleExport}>
              Export
            </Button>
            <Button color="flat-danger" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Row>
      
    );
  }
}

export default injectIntl(ListPageHeadingBarang);
