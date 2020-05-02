import { SignOutAction, SignInAction, AUTH_ACTION_TYPES } from './../types';

export const signIn = (nombreAlumno: string): SignInAction => {
  return {
    type: AUTH_ACTION_TYPES.SIGN_IN,
    data: {nombre: nombreAlumno}
  };
};

export const signOut = (): SignOutAction => {
  return {
    type: AUTH_ACTION_TYPES.SIGN_OUT,
  };
};

