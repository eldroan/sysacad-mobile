import React from "react";
import { StyleSheet } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import {
  SafeAreaLayoutElement,
  SafeAreaLayout,
  SaveAreaInset,
} from "../components/safe-are-layout.component";
import { DefaultProps } from "../navigation/app.navigator";

export const HomeScreen = ({
  navigation,
}: DefaultProps): SafeAreaLayoutElement => {
  const goBack = () => {
    navigation.pop()
  };
  return (
    <SafeAreaLayout style={styles.safeArea} insets={SaveAreaInset.TOP}>
      <Text appearance="hint" style={{ textAlign: "center", marginBottom:10 }}>
        This is not the screen you are looking for...
      </Text>
      <Button onPress={goBack}>BACK</Button>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
