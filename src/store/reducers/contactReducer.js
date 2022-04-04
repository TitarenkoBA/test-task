import initialState from "../initialState"
import {
  CHANGE_CONTACT,
  CHANGE_CONTACT_REQUEST,
  CHANGE_CONTACT_FAILURE,
  DELETE_CONTACT,
  DELETE_CONTACT_REQUEST,
  DELETE_CONTACT_FAILURE,
  CREATE_CONTACT,
  CREATE_CONTACT_REQUEST,
  CREATE_CONTACT_FAILURE,
  GET_CONTACTS,
  GET_CONTACTS_REQUEST,
  GET_CONTACTS_FAILURE
} from "../constants"

export default function contactReducer(state = initialState.contacts, action) {
  switch (action.type) {
    case CHANGE_CONTACT:
      if (action.data === undefined) {
        return state;
      }
      return Object.assign({}, state, {
        contacts:  action.data.contacts,
        status: null,
        error: null
      });
    case CHANGE_CONTACT_REQUEST:
      return Object.assign({}, state, {status: "requesting"})
    case CHANGE_CONTACT_FAILURE:
      if (action.data === undefined) {
        return state;
      }
      state.error = action.data.error;
      state.status = null;
      return state;
    case DELETE_CONTACT:
      if (action.data === undefined) {
        return state;
      }
      return Object.assign({}, state, {
        contacts:  action.data.contacts,
        status: null,
        error: null
      });
    case DELETE_CONTACT_REQUEST:
      return Object.assign({}, state, {status: "requesting"})
    case DELETE_CONTACT_FAILURE:
      if (action.data === undefined) {
        return state;
      }
      state.error = action.data.error;
      state.status = null;
      return state;
    case CREATE_CONTACT:
      if (action.data === undefined) {
        return state;
      }
      return Object.assign({}, state, {
        contacts:  action.data.contacts,
        status: null,
        error: null
      });
    case CREATE_CONTACT_REQUEST:
      return Object.assign({}, state, {status: "requesting"})
    case CREATE_CONTACT_FAILURE:
      if (action.data === undefined) {
        return state;
      }
      state.error = action.data.error;
      state.status = null;
      return state;
    case GET_CONTACTS: 
      return Object.assign({}, state, {
        contacts:  action.data.contacts,
        status: null,
        error: null
      });
    case GET_CONTACTS_REQUEST:
      return Object.assign({}, state, {status: "requesting"})
    case GET_CONTACTS_FAILURE:
      if (action.data === undefined) {
        return state;
      }
      state.error = action.data.error;
      state.status = null;
      return state;
    default:
      return state;
  }
}