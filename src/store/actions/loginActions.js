export const LOGIN_LOGGED_IN = "LOGIN_LOGGED_IN";
export const LOGIN_LOGGED_OUT = "LOGIN_LOGGED_OUT";
export const LOGIN_LOGON_FAILURE = "LOGIN_LOGON_FAILURE";
export const LOGIN_LOGON_REQUEST = "LOGIN_LOGON_REQUEST";

export const log_in = ({ login, password }) => {
  return (dispatch, getState, { api }) => {
    dispatch(log_inStarted());
    api
      .get(`users?login=${login}&password=${password}`)
      .then(res => {
        if (!res.data.length) {
          setTimeout(() => dispatch(log_inFailure("Wrong login or password")), 1000);
        } else {
          setTimeout(() => dispatch(log_inSuccess(res.data)), 1000);
        }
      })
      .catch(err => {
        setTimeout(() => dispatch(log_inFailure(err.message)), 1000);
      });
  };
};

const log_inSuccess = data => ({
  type: LOGIN_LOGGED_IN,
  data: data[0]
});

const log_inStarted = () => ({
  type: LOGIN_LOGON_REQUEST
});

const log_inFailure = error => ({
  type: LOGIN_LOGON_FAILURE,
  data: error
});

export const log_out = (props) => {
  return (dispatch, getState) => {
    dispatch({
      type: LOGIN_LOGGED_OUT,
      data: null,
    });
  };
};
