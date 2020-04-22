import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { AppRoute } from "./app-routes";
import { AuthScreen } from "../scenes/auth.component";
import { HomeScreen } from "../scenes/home.component";
import { RouteProp } from "@react-navigation/native";

export type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

export type AppNavigatorParams = {
  [AppRoute.AUTH]: undefined;
  [AppRoute.HOME]: undefined;
};
const Stack = createStackNavigator<AppNavigatorParams>();

type DefaultScreenRouteProp = RouteProp<AppNavigatorParams, AppRoute>;
type DefaultScreenNavigationProp = StackNavigationProp<
  AppNavigatorParams,
  AppRoute
>;

export type DefaultProps = {
  route: DefaultScreenRouteProp;
  navigation: DefaultScreenNavigationProp;
};
export const AppNavigator = (
  props: Partial<StackNavigatorProps>
): React.ReactElement => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={AppRoute.AUTH}>
      <Stack.Screen name={AppRoute.AUTH} component={AuthScreen} />
      <Stack.Screen name={AppRoute.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};
