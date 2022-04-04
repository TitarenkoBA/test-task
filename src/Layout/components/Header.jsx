import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { log_out } from "../../store/actions/loginActions";

function Header({
  loggedIn,
  theme = "dark",
  changeTheme,
  getLogOut,
  user = {},
}) {
  const color = theme === "light" ? "info" : "secondary";
  const buttonColor = theme === "light" ? "light" : "info";
  const navigate = useNavigate();
  return (
    <div>
      <Navbar color={color} expand="md" light>
        <NavbarBrand>Takeoff Staff</NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() {}} />
        <Collapse navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag="span">
                <Link className="btn" color="info" to="/">
                  Home
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag="span">
                <Link className="btn" color="info" to="/contacts">
                  Contacts
                </Link>
              </NavLink>
            </NavItem>
            <UncontrolledDropdown inNavbar nav>
              <DropdownToggle nav>
                <Button color={color}>Theme</Button>
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem
                  onClick={() => {
                    if (changeTheme) changeTheme("light");
                  }}
                >
                  Light
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() => {
                    if (changeTheme) changeTheme("dark");
                  }}
                >
                  Dark
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText className="d-flex">
            {user && user.firstName && user.lastName && (
              <p className="mx-4 my-0 p-2">
                {user.firstName + " " + user.lastName}
              </p>
            )}
            {loggedIn && (
              <Button
                color={buttonColor}
                onClick={() => {
                  navigate("/log_in");
                  if (getLogOut) getLogOut();
                }}
              >
                Log out
              </Button>
            )}
            {!loggedIn && (
              <Button
                color="light"
                onClick={() => {
                  navigate("/log_in");
                }}
              >
                Log in
              </Button>
            )}
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

Header.propTypes = {
  loggedIn: PropTypes.bool,
  theme: PropTypes.string,
  changeTheme: PropTypes.func.isRequired,
  getLogOut: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = function (state) {
  return {
    loggedIn: state.login.loggedIn,
    user: state.login.user,
    theme: state.theme.theme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTheme: (theme) => {
      dispatch({ type: "CHANGE_THEME", data: { theme } });
    },
    getLogOut: () => dispatch(log_out()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
