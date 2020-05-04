import { Especialidad } from "./../models/especialidad";
import { Examen } from "./../models/examen";
import { Alumno } from "../models/alumno";

export type ApplicationState = {
  auth: AuthState;
  examenes: ExamenesState;
  // add future state slices here
};

//--------- Begin: Auth Slice ---------//
export enum AUTH_ACTION_TYPES {
  SIGN_IN = "AUTH/SIGN_IN",
  SIGN_OUT = "AUTH/SIGN_OUT",
}
export const SYSACAD_TOKEN_KEY = "@SYSACADTOKENKEY";

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
//--------- Begin: Examenes Slice ---------//
export enum EXAMENES_ACTION_TYPES {
  EXAMENES_ALUMNO = "EXAMENES/EXAMENES_ALUMNO",
  EXAMENES_REQUEST_IN_PROGRESS = "EXAMENES/EXAMENES_REQUEST_IN_PROGRESS",
}

export type ExamenesAlumnoAction = {
  type: string;
  examenes: Examen[];
  especialidades: Especialidad[];
  aprobados: number;
  promedioConAplazo: number;
  promedioSinAplazo: number;
};

export type ExamenesRequestInProgresAction = {
  type: string;
  inProgress: boolean;
};

export type ExamenesAction =
  | ExamenesAlumnoAction
  | ExamenesRequestInProgresAction;

export type ExamenesState = {
  examenes: Examen[];
  especialidades: Especialidad[];
  aprobados: number;
  promedioConAplazo: number;
  promedioSinAplazo: number;
  requestInProgress: boolean;
};
//--------- End: Examenes Slice ---------//
