import React, { useState } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { updateContact, createContact } from "../store/actions/contactActions";

function ModalForm({
  isOpen = false,
  toggle,
  getUpdateContact,
  getCreateContact,
  user = {},
  selected = null,
  contacts = [],
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [login, setLogin] = useState("");

  function onClose() {
    setFirstName("");
    setLastName("");
    setLogin("");
    toggle(false);
  }

  function onSubmit() {
    const id = selected
      ? selected.id
      : (contacts && contacts.length && contacts[contacts.length - 1].id + 1) ||
        1;
    if (selected)
      getUpdateContact(user, {
        id,
        firstName: firstName || selected.firstName,
        lastName: lastName || selected.lastName,
        login: login || selected.login,
      });
    else getCreateContact(user, { id, firstName, lastName, login });
    onClose();
  }

  return (
    <Modal centered isOpen={isOpen} toggle={() => onClose()}>
      <ModalHeader toggle={() => onClose()}>
        {selected ? "Change contact information" : "Create contact"}
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              value={!firstName ? selected && selected.firstName || "" : firstName}
              onChange={(event) => setFirstName(event.target.value)}
              id="firstName"
              name="login"
              placeholder="First Name"
              type="login"
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              value={!lastName ? selected && selected.lastName || "" : lastName}
              onChange={(event) => setLastName(event.target.value)}
              id="lastName"
              name="login"
              placeholder="Last Name"
              type="login"
            />
          </FormGroup>
          <FormGroup>
            <Label for="username">Login</Label>
            <Input
              value={!login ? selected && selected.login || "" : login}
              onChange={(event) => setLogin(event.target.value)}
              id="username"
              name="login"
              placeholder="username"
              type="login"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color={"info"} onClick={() => onSubmit()}>
          {selected ? "Change" : "Create"}
        </Button>{" "}
        <Button color={"secondary"} onClick={() => onClose()}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

ModalForm.propTypes = {
  contacts: PropTypes.array,
  isOpen: PropTypes.bool,
  user: PropTypes.object,
  selected: PropTypes.object,
  toggle: PropTypes.func.isRequired,
  getUpdateContact: PropTypes.func.isRequired,
  getCreateContact: PropTypes.func.isRequired,
};

const mapStateToProps = function (state) {
  return {
    user: state.login.user,
    contacts: state.contacts.contacts || [],
    loggedIn: state.login.loggedIn,
    theme: state.theme.theme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUpdateContact: (user, contact) =>
      dispatch(updateContact({ user, contact })),
    getCreateContact: (user, contact) =>
      dispatch(createContact({ user, contact })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);
