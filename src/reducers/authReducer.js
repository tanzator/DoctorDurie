import {
  LOGOUT_USER_SUCCESS,
  LOG_IN_ANONYMOUSLY_SUCCESS,
  LOG_IN_WITH_EMAIL_AND_PASSWORD_SUCCESS,
  LOG_IN_WITH_GOOGLE_SUCCESS,
  REGISTER_USER_SUCCESS
} from "../actions/Types";

const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_ANONYMOUSLY_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case LOG_IN_WITH_EMAIL_AND_PASSWORD_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case LOG_IN_WITH_GOOGLE_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        user: null,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
