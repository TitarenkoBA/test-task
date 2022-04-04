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
  GET_CONTACTS_FAILURE,
} from "../constants"

export const createContact = ({ user, contact }) => {
  return (dispatch, getState, { api }) => {
    dispatch(createStarted());
    user.contacts.push(contact);
    api
      .put(`users/${user.id}`, user)
      .then(res => {
        setTimeout(() => dispatch(createSuccess(res.data)), 1000);
      })
      .catch(err => {
        setTimeout(() => dispatch(createFailure(err.message)), 1000);
      });
  };
};

export const updateContact = ({ user, contact }) => {
  return (dispatch, getState, { api }) => {
    dispatch(updateStarted());
    let index = user.contacts.findIndex( cont => cont.id === contact.id);
    user.contacts[index] = contact;
    api
      .put(`users/${user.id}`, user)
      .then(res => {
        setTimeout(() => dispatch(updateSuccess(res.data)), 1000);
      })
      .catch(err => {
        setTimeout(() => dispatch(updateFailure(err.message)), 1000);
      });
  };
};

export const deleteContact = ({ user, contact }) => {
  return (dispatch, getState, { api }) => {
    dispatch(deleteStarted());
    user.contacts = user.contacts.filter( cont => cont.id !== contact.id );
    api
      .put(`users/${user.id}`, user)
      .then(res => {
        setTimeout(() => dispatch(deleteSuccess(res.data)), 1000);
      })
      .catch(err => {
        setTimeout(() => dispatch(deleteFailure(err.message)), 1000);
      });
  };
};

export const getContacts = ({ id }) => {
  return (dispatch, getState, { api }) => {
    dispatch(getContactsStarted());
    api
      .get(`users/${id}`)
      .then(res => {
        setTimeout(() => dispatch(getContactsSuccess(res.data)), 1000);
      })
      .catch(err => {
        setTimeout(() => dispatch(getContactsFailure(err.message)), 1000);
      });
  };
};

const getContactsSuccess = data => ({
  type: GET_CONTACTS,
  data: data
});

const getContactsStarted = () => ({
  type: GET_CONTACTS_REQUEST
});

const getContactsFailure = error => ({
  type: GET_CONTACTS_FAILURE,
  data: {
    error
  }
});

const createSuccess = data => ({
  type: CREATE_CONTACT,
  data: data
});

const createStarted = () => ({
  type: CREATE_CONTACT_REQUEST
});

const createFailure = error => ({
  type: CREATE_CONTACT_FAILURE,
  data: {
    error
  }
});

const updateSuccess = data => ({
  type: CHANGE_CONTACT,
  data: data
});

const updateStarted = () => ({
  type: CHANGE_CONTACT_REQUEST
});

const updateFailure = error => ({
  type: CHANGE_CONTACT_FAILURE,
  data: {
    error
  }
});

const deleteSuccess = data => ({
  type: DELETE_CONTACT,
  data: data
});

const deleteStarted = () => ({
  type: DELETE_CONTACT_REQUEST
});

const deleteFailure = error => ({
  type: DELETE_CONTACT_FAILURE,
  data: {
    error
  }
});