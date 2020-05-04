import {
  AuthState,
  AuthAction,
  AUTH_ACTION_TYPES,
  SignInAction,
} from "./../types";

const initialState: AuthState = {};

export const authSlice = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.SIGN_IN:
      const alumno = (action as SignInAction).data;
      return { ...state, alumno };
    case AUTH_ACTION_TYPES.SIGN_OUT:
      return { ...state, alumno: undefined };
    default:
      return state;
  }
};
