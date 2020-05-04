import { Examenes } from "./examenes";

export type BaseResponse = {
  status: number;
  message: string;
};

export type LoginResponse = BaseResponse & {
  alumno: string;
};

export type ExamenResponse = BaseResponse & {
  response: Examenes;
};
