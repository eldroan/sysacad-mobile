export type NetworkResponse<T> = {
  status: number;
  message: string;
  response?: T;
};

export type Login = {
  alumno: string;
  rutas: Array<{ titulo: string; ruta: string }>;
};
