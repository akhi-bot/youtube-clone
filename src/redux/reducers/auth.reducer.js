import { LOGIN_REQUEST, LOGIN_SUCCESS, LOAD_PROFILE, LOGIN_FAIL, LOG_OUT } from "../actionsTypes";

 const initialState = {
  accessToken: sessionStorage.getItem('ytc-access-token') || null,
  user: JSON.parse(sessionStorage.getItem('ytc-user')) || null,
  loading: false,
};

export const authReducer = (prevState = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...prevState,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...prevState,
        accessToken: payload,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        ...prevState,
        accessToken: null,
        loading: false,
        error: payload,
      };
    case LOAD_PROFILE:
      return {
        ...prevState,
        user: payload,
      };

    case LOG_OUT:
      return {
        ...prevState,
        accessToken: null,
        user: null
      }

    default:
      return prevState;
  }
};
