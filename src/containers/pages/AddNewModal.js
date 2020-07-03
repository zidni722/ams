import React from "react";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import IntlMessages from "../../helpers/IntlMessages";

const AddNewModal = ({ modalOpen, toggleModal, categories }) => {
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-size"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="Tambah Barang" />
      </ModalHeader>
      <ModalBody>
        <Label>
          <IntlMessages id="Code Barang " />
        </Label>
        <Input />
        <Label className="mt-4">
          <IntlMessages id="Nama Barang " />
        </Label>
        <Input />
        <Label className="mt-4">
          <IntlMessages id="Jenis Barang" />
        </Label>
        <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="form-field-name"
          options={categories}
        />
        <Label className="mt-4">
          <IntlMessages id="pages.description" />
        </Label>
        <Input type="textarea" name="text" id="exampleText" />
        <Label className="mt-4">
          <IntlMessages id="Status" />
        </Label>
        <CustomInput
          type="radio"
          id="exCustomRadio"
          name="customRadio"
          label="ON HOLD"
        />
        <CustomInput
          type="radio"
          id="exCustomRadio2"
          name="customRadio"
          label="PROCESSED"
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="Batal" />
        </Button>
        <Button color="primary" onClick={toggleModal}>
          <IntlMessages id="Tambah" />
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default AddNewModal;
