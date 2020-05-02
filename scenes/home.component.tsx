import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text, Button, Layout } from "@ui-kitten/components";
import {
  SafeAreaLayoutElement,
  SafeAreaLayout,
  SaveAreaInset,
} from "../components/safe-are-layout.component";
import { DefaultProps } from "../navigation/app.navigator";
import { padding } from "../assets/uispec";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../redux/types";
import { TinyHorizontalSpacer } from "../components/spacers.component";
import { ExamenesAlumno } from "../redux/examenes/actions";

export const HomeScreen = ({
  navigation,
}: DefaultProps): SafeAreaLayoutElement => {
  const goBack = () => {
    navigation.pop();
  };
  const [requestExamenes, setRequestExamenes] = useState(true);
  const nombre = useSelector(
    (state: ApplicationState) => state.auth.alumno?.nombre ?? ""
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (requestExamenes) {
      dispatch(ExamenesAlumno());
      setRequestExamenes(false);
    }
  }, [requestExamenes]);

  return (
    <Layout level="1" style={styles.container}>
      <SafeAreaLayout style={styles.header} insets={SaveAreaInset.TOP}>
        <Text category="h1">INFORMACIÓN</Text>
      </SafeAreaLayout>
      {/* <Layout level="2">
        <Text style={styles.headerTextStyle}>{nombre}</Text>
      </Layout>
      <Button onPress={goBack}>BACK</Button> */}

      <Layout level="2" style={styles.content}></Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: padding.medium,
    paddingTop: padding.large,
    paddingBottom: padding.tiny,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: padding.medium,
  },
  headerTextStyle: { textTransform: "uppercase" },
});
