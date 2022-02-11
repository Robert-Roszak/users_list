import Axios from 'axios';
import { API_URL } from '../config';

/* action name creator */
const reducerName = 'users';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const DELETE_SUCCESS = createActionName('DELETE_SUCCESS');
const EDIT_SUCCESS = createActionName('EDIT_SUCCESS');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const deleteSuccess = payload => ({ payload, type: DELETE_SUCCESS });
export const editSuccess = payload => ({ payload, type: EDIT_SUCCESS });

/* thunk creators */
export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchStarted());
    Axios
      .get(`${API_URL}/users`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const deleteUser = (user) => {
  return (dispatch) => {
    dispatch(fetchStarted());
    Axios
      .delete(`${API_URL}/userDelete`, {data: user})
      .then(res => {
        dispatch(deleteSuccess(user.id));
      })
      .catch(err => {
        // IMPORTANT
        // because manually added user is not existing in API, error message comes in and prevents edits
        // below line commented and switched with deleteSuccess to work properly
        //dispatch(fetchError(err.message || true));
        dispatch(deleteSuccess(user.id));
      });
  };
};

export const addUser = (user, users) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .post(`${API_URL}/userAdd`, user)
      .then(res => {
        users.push(res.data);
        dispatch(fetchSuccess(users));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const editUser = (user) => {
  return (dispatch) => {
    dispatch(fetchStarted());

    Axios
      .put(`${API_URL}/userEdit`, user)
      .then(res => {
        dispatch(editSuccess(user));
      })
      .catch(err => {
        // IMPORTANT
        // because manually added user is not existing in API, error message comes in and prevents edits
        // below line commented and switched with editSuccess to work properly
        //dispatch(fetchError(err.message || true));
        dispatch(editSuccess(user));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case DELETE_SUCCESS: {
      let newStatePart = {};
      newStatePart.data = statePart.data.filter(object => object.id !== action.payload);
      return {
        ...newStatePart,
        loading: {
          active: false,
          error: false,
        },
      };
    }
    case EDIT_SUCCESS: {
      let newStatePart = {};
      newStatePart.data = statePart.data.filter(object => object.id !== action.payload.id);
      newStatePart.data.push(action.payload);
      newStatePart.data.sort((a, b) => {
        return a.id - b.id;
      });
      return {
        ...newStatePart,
        loading: {
          active: false,
          error: false,
        },
      };
    }
    default:
      return statePart;
  }
};
