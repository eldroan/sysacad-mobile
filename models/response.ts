export type BaseResponse = {
  status: number;
  message: string;
};

export type LoginResponse = BaseResponse &{
  alumno: string;
};
