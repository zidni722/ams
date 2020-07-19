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

const AddNewModalUser = ({ modalOpen, toggleModal, categories }) => {
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-size"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="Tambah Pegawai" />
      </ModalHeader>
      <ModalBody>
        <Label>
          <IntlMessages id="NPK " />
        </Label>
        <Input />
        <Label className="mt-4">
          <IntlMessages id="Nama Pegawai " />
        </Label>
        <Input />
        <Label className="mt-4">
          <IntlMessages id="Divisi" />
        </Label>
        <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="form-field-name"
          options={categories}
        />
        <Label className="mt-4">
          <IntlMessages id="Description" />
        </Label>
        <Input type="textarea" name="text" id="exampleText" />
        <Label className="mt-4">
          <IntlMessages id="Role" />
        </Label>
        <CustomInput
          type="radio"
          id="exCustomRadio"
          name="customRadio"
          label="Pegawai"
        />
        <CustomInput
          type="radio"
          id="exCustomRadio2"
          name="customRadio"
          label="Lead"
        />
        <CustomInput
          type="radio"
          id="exCustomRadio2"
          name="customRadio"
          label="Human Resource"
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

export default AddNewModalUser;
