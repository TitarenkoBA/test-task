import initialState from "../initialState"
import {
  LOGIN_LOGGED_IN,
  LOGIN_LOGON_FAILURE,
  LOGIN_LOGGED_OUT,
  LOGIN_LOGON_REQUEST
} from "../constants"

export default function loginReducer(state = initialState.login, action) {
  switch (action.type) {
    case LOGIN_LOGON_REQUEST: 
      return Object.assign({}, state, {status: "requesting"})
    case LOGIN_LOGGED_IN:
      if (action.data === undefined) {
        return state;
      }
      localStorage.setItem("Authorization", action.data.token);
      return Object.assign({}, state, {
        user: action.data,
        loggedIn: true,
        status: null,
        error: null
      });
    case LOGIN_LOGON_FAILURE:
      if (action.data === undefined) {
        return state;
      }
      return Object.assign({}, state, {
        user: null,
        token: null,
        loggedIn: false,
        status: "error",
        error: action.data
      });
    case LOGIN_LOGGED_OUT:
      localStorage.setItem("Authorization", undefined);
      document.cookie = 'token=; Max-Age=-99999999;';
      return Object.assign({}, state, {
        loggedIn: false,
        user: null,
        token: null,
        error: null,
        status: null,
      });;
    default:
      return state;
  }
}