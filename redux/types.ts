export type ApplicationState = {
  auth: AuthState;
  // add future state slices here
};

//--------- Begin: Data types ---------//
export type Alumno = {
  nombre: string;
};
//--------- End: Data types ---------//

//--------- Begin: Auth Slice ---------//
export enum AUTH_ACTION_TYPES {
  SIGN_IN = "AUTH/SIGN_IN",
  SIGN_OUT = "AUTH/SIGN_OUT",
}

export type SignInAction = {
  type: string;
  data: Alumno;
};

export type SignOutAction = {
  type: string;
};

export type AuthAction = SignInAction | SignOutAction;

export type AuthState = {
  alumno?: Alumno;
};
//--------- End: Auth Slice ---------//
