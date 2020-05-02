import axios, { AxiosRequestConfig } from "axios";
import { Base64 } from "js-base64";
import { NetworkResponse, Login } from "../models/response";

const sysacad_api = {
  token_key: "SYSACADMOBILE",
  base: "https://sysacad-api.herokuapp.com/",
  // base: "http://localhost:3000/",
  login: "alumno",
};

export const MockRequest = async (
  ...args: any[]
): Promise<{ status: number }> => {
  const timeout = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const random = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };
  await timeout(random(0, 3000));
  return { status: 200 };
};

export const login = async (
  legajo: string,
  password: string
): Promise<{ status: number; message: string }> => {
  try {
    const token = Base64.encode(`${legajo}:${password}`);

    const res = (
      await axios.get<NetworkResponse<Login>>(
        `${sysacad_api.base}${sysacad_api.login}`,
        {
          headers: { Authorization: `Basic ${token}` },
        }
      )
    ).data;

    return {
      status: res.status,
      message: res.response?.alumno ?? "",
    };
  } catch (error) {
    if (error?.response?.data ?? false) {
      //Error conocido
      return {
        status: error.response.data.status,
        message: error.response.data.message,
      };
    } else {
      return { status: 500, message: "Algo salio mal" };
    }
  }
};
