import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import LoginForm from "../components/LoginForm";
import { Navigate } from "react-router-dom";

class Login extends React.Component {
  render() {
    const { loggedIn } = this.props;
    return (
      <div>
        {loggedIn && <Navigate to="/contacts" replace={true} />}
        {!loggedIn && <LoginForm />}
      </div>
    );
  }
}

Login.propTypes = {
  loggedIn: PropTypes.bool,
};

const mapStateToProps = function (state) {
  return {
    loggedIn: state.login.loggedIn,
  };
};

export default connect(mapStateToProps)(Login);
