import axios, { AxiosRequestConfig } from "axios";
import { Base64 } from "js-base64";
// import AsyncStorage from "@react-native-community/async-storage";
import { NetworkResponse, Login } from "../models/response";

const sysacad_api = {
  token_key: "SYSACADMOBILE",
  base: "https://sysacad-api.herokuapp.com/",
  login: "login",
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
    // await AsyncStorage.setItem(sysacad_api.token_key, token);

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
      message: res.status === 200 ? res.response?.alumno ?? "" : res.message,
    };
  } catch (e) {
    console.log(e);
    return { status: 500, message: "Algo salio mal" };
  }
};
