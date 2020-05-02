import { AppRoute } from "./../../navigation/app-routes";
import {
  SignOutAction,
  SignInAction,
  AUTH_ACTION_TYPES,
  SYSACAD_TOKEN_KEY,
} from "./../types";
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { AsyncStorage } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppNavigatorParams } from "../../navigation/app.navigator";

export const signIn = (nombreAlumno: string): SignInAction => {
  return {
    type: AUTH_ACTION_TYPES.SIGN_IN,
    data: { nombre: nombreAlumno },
  };
};

export const signOut = (): SignOutAction => {
  return {
    type: AUTH_ACTION_TYPES.SIGN_OUT,
  };
};

export const SignIn = (
  nombreAlumno: string,
  token: string,
  navigation: StackNavigationProp<AppNavigatorParams, AppRoute>
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      await AsyncStorage.setItem(SYSACAD_TOKEN_KEY, token); //Storing the token
      navigation.navigate(AppRoute.HOME);
      dispatch(signIn(nombreAlumno));
    } catch (error) {
      console.log(error);
      console.log("Algo malio sal");
    }
  };
};
