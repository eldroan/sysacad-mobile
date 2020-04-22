import React from "react";
import { StyleSheet } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import {
  SafeAreaLayoutElement,
  SafeAreaLayout,
  SaveAreaInset,
} from "../components/safe-are-layout.component";
import { DefaultProps } from "../navigation/app.navigator";
import { AppRoute } from "../navigation/app-routes";

export const AuthScreen = ({
  navigation,
}: DefaultProps): SafeAreaLayoutElement => {
  const goHome = () => {
    navigation.navigate(AppRoute.HOME);
  };
  return (
    <SafeAreaLayout style={styles.safeArea} insets={SaveAreaInset.TOP}>
      <Text style={styles.text} category="h1">
        LOGIN
      </Text>
      <Button onPress={goHome}>HOME</Button>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
});
