import React from "react"
import ReactDOM from "react-dom"
import ExtensionsHeader from "../extensionsHeader"
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  CustomInput
} from "reactstrap"
import { Search } from "react-feather"
import XLSX from "xlsx"
import * as FileSaver from "file-saver"

class Export extends React.Component {
  state = {
    filteredData: [],
    value: "",
    modal: false,
    fileName: "",
    fileFormat: "xlsx"
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

  render() {
    let array = this.state.value ? this.state.filteredData : this.state.data
    let renderTableData = array.map(col => {
      return (
        <tr key={col.id}>
          <td>{col.email}</td>
          <td>{col.name}</td>
          <td>{col.website}</td>
          <td>{col.id}</td>
        </tr>
      )
    })
    return (
      <React.Fragment>
        <ExtensionsHeader
          title="XLSX"
          subTitle="Xlsx is a parser and writer for various spreadsheet formats"
          link="https://github.com/AdeleD/react-paginate"
        />
        <Row className="export-component">
          <Col sm="12">
            <Card>
              <CardBody>
                <Row>
                  <Col sm="12">
                    <div className="d-flex justify-content-between flex-wrap">
                      <Button.Ripple color="primary" onClick={this.toggleModal}>
                        Export
                      </Button.Ripple>
                      <div className="filter position-relative has-icon-left">
                        <Input
                          type="text"
                          value={this.state.value}
                          onChange={e => this.handleFilter(e)}
                        />
                        <div className="form-control-position">
                          <Search size={15} />
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col sm="12">
                    <Table
                      innerRef={el => (this.tableRef = el)}
                      className="table-hover-animation mt-2"
                      responsive>
                      <thead>
                        <tr>
                          <th>Email</th>
                          <th>Name</th>
                          <th>Website</th>
                          <th>Rank</th>
                        </tr>
                      </thead>
                      <tbody>{renderTableData}</tbody>
                    </Table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
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
                value={this.state.fileFormat}
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
      </React.Fragment>
    )
  }
}

export default Export
