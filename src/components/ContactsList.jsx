import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import ModalForm from "./ModalForm";
import { Table, Button, Input } from "reactstrap";
import OneContact from "./OneContact";
import { getContacts } from "../store/actions/contactActions";
import { Spinner } from "reactstrap";

function ContactsList({
  contacts = [],
  loadContacts,
  user = {},
  status = null,
  theme = "dark",
}) {
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [search, setSearch] = useState("");
  const spinnerColor = theme === "dark" ? "dark" : "info";

  useEffect(() => {
    loadContacts(user.id);
  }, []);

  if (status === "requesting")
    return (
      <Spinner className="mt-4" color={spinnerColor}>
        Loading...
      </Spinner>
    );

  return (
    <>
      <Input
        style={{ width: "30%", margin: "20px 50px" }}
        id="search"
        name="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="search"
      />
      <Table hover responsive striped>
        <thead>
          <tr>
            <th>id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Login</th>
            <th>
              <Button
                color="success"
                onClick={() => {
                  setSelected("");
                  setOpen(true);
                }}
              >
                Create
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts
            .filter(
              (c) =>
                c.firstName.toLowerCase().includes(search.toLowerCase()) ||
                c.lastName.toLowerCase().includes(search.toLowerCase()) ||
                c.login.toLowerCase().includes(search.toLowerCase())
            )
            .map((contact, index) => (
              <OneContact
                contact={contact}
                key={contact.id + "_" + index}
                setOpen={setOpen}
                setSelected={setSelected}
                deleteUser
              />
            ))}
        </tbody>
      </Table>
      <ModalForm isOpen={isOpen} toggle={setOpen} selected={selected ? selected : null} />
    </>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.array,
  loadContacts: PropTypes.func.isRequired,
  user: PropTypes.object,
  status: PropTypes.string,
  theme: PropTypes.string,
};

const mapStateToProps = function (state) {
  return {
    loggedIn: state.login.loggedIn,
    contacts: state.contacts.contacts || [],
    status: state.contacts.status,
    user: state.login.user,
    theme: state.theme.theme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadContacts: (id) => dispatch(getContacts({ id })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
