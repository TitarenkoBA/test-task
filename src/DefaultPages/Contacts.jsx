import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import ContactsList from "../components/ContactsList";

class Contacts extends React.Component {
  render() {
    const {loggedIn} = this.props;
    return (
      <div>
        {!loggedIn && <Navigate to="/log_in" replace={true} />}
        {loggedIn && <ContactsList />}
      </div>
    );
  }
}

Contacts.propTypes = {
  loggedIn: PropTypes.bool,
};

const mapStateToProps = function (state) {
  return {
    loggedIn: state.login.loggedIn,
  };
};

export default connect(mapStateToProps)(Contacts);
