import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { deleteContact } from "../store/actions/contactActions";

function OneContact({ setOpen, contact, getDeleteContact, setSelected, user }) {
  return (
    <>
      <tr
        onClick={() => {
          setSelected(contact);
          setOpen(true);
        }}
      >
        <th scope="row">{contact.id}</th>
        <td>{contact.firstName}</td>
        <td>{contact.lastName}</td>
        <td>{contact.login}</td>
        <td>
          <Button
            color="danger"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              getDeleteContact(user, contact);
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
}

OneContact.propTypes = {
  contact: PropTypes.object,
  user: PropTypes.object,
  selected: PropTypes.object,
  setOpen: PropTypes.func.isRequired,
  setSelected: PropTypes.func.isRequired,
  getDeleteContact: PropTypes.func.isRequired,
};

const mapStateToProps = function (state) {
  return {
    user: state.login.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDeleteContact: (user, contact) =>
      dispatch(deleteContact({ user, contact })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OneContact);
