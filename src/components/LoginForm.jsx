import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
  Form,
  FormGroup,
  Label,
  Input,
  CardTitle,
  Card,
  CardText,
  Button,
} from "reactstrap";
import { log_in } from "../store/actions/loginActions";
import { Spinner } from "reactstrap";

function LoginForm({ theme = "dark", getLogIn, status = null, error = null }) {
  const color = theme === "light" ? "info" : "secondary";
  const buttonColor = theme === "light" ? "light" : "info";
  const spinnerColor = theme === "dark" ? "dark" : "info";

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  if (status === "requesting")
    return (
      <Spinner className="mt-4" color={spinnerColor}>
        Loading...
      </Spinner>
    );

  return (
    <Card
      body
      style={{
        width: "500px",
        margin: " 20px auto 20px",
        padding: "50px",
      }}
      color={color}
    >
      <CardTitle tag="h5">This is log in form</CardTitle>
      <CardText>Here you can get access to your contacts.</CardText>
      <Form>
        <FormGroup>
          <Label for="login">Login</Label>
          <Input
            onChange={(event) => setLogin(event.target.value)}
            id="login"
            name="login"
            placeholder="login"
            type="login"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            onChange={(event) => setPassword(event.target.value)}
            id="password"
            name="password"
            placeholder="password"
            type="password"
          />
        </FormGroup>
        <Button color={buttonColor} onClick={() => getLogIn(login, password)}>
          Login
        </Button>
        {error ? <p className="text-danger">{error}</p> : ""}
      </Form>
    </Card>
  );
}

LoginForm.propTypes = {
  error: PropTypes.string,
  getLogIn: PropTypes.func.isRequired,
  status: PropTypes.string,
  theme: PropTypes.string,
};

const mapStateToProps = function (state) {
  return {
    status: state.login.status,
    theme: state.theme.theme,
    error: state.login.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLogIn: (login, password) => dispatch(log_in({ login, password })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
