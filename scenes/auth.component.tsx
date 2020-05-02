import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Linking,
  Platform,
} from "react-native";
import {
  Text,
  Button,
  Layout,
  Input,
  Icon,
  Spinner,
  Modal,
  Card,
} from "@ui-kitten/components";
import {
  SafeAreaLayoutElement,
  SafeAreaLayout,
  SaveAreaInset,
} from "../components/safe-are-layout.component";
import { DefaultProps } from "../navigation/app.navigator";
import { AppRoute } from "../navigation/app-routes";
import { padding, bigScreens } from "../assets/uispec";
import {
  TinyHorizontalSpacer,
  SmallHorizontalSpacer,
  MediumHorizontalSpacer,
  LargeHorizontalSpacer,
} from "../components/spacers.component";
import { expo } from "../app.json";
import { login } from "../services/sysacad-client";
import { useDispatch } from "react-redux";
import { SignIn } from "../redux/auth/actions";

export const AuthScreen = ({
  navigation,
}: DefaultProps): SafeAreaLayoutElement => {
  const [legajo, setLegajo] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loginPressed, setLoginPressed] = useState(false);
  const [modal, setModal] = useState({ show: false, title: "", message: "" });
  const dispatch = useDispatch();
  // Handle login button presses
  // useEffect makes sure it runs once no matter how many times the button is pressed
  useEffect(() => {
    if (loginPressed) {
      login(legajo, password).then((res) => {
        setLoginPressed(false);
        if (res.status == 200) {
          dispatch(SignIn(res.alumno ?? "", res.token ?? "", navigation));
        } else {
          setModal({
            show: true,
            title: "Algo salio mal...",
            message: res.message,
          });
        }
      });
    }
  }, [loginPressed]);

  const goHome = () => {
    navigation.navigate(AppRoute.HOME);
  };

  const passwordIcon = (style: any) => (
    <Icon {...style} name={secureTextEntry ? "eye-off" : "eye"} />
  );

  const githubIcon = (style: any) => <Icon {...style} name="github" />;

  return (
    <Layout level="1" style={styles.container}>
      {/* ERROR MODAL */}
      <Modal
        visible={modal.show}
        backdropStyle={styles.backdrop}
        onBackdropPress={() =>
          setModal({ show: false, title: "", message: "" })
        }
      >
        <Card disabled={true}>
          <Text category="h6">{modal.title}</Text>
          <MediumHorizontalSpacer />
          <Text>{modal.message}</Text>
          <MediumHorizontalSpacer />
          <Button
            onPress={() => setModal({ show: false, title: "", message: "" })}
          >
            OK
          </Button>
          <TinyHorizontalSpacer />
        </Card>
      </Modal>
      {/* HEADER */}
      <SafeAreaLayout style={styles.header} insets={SaveAreaInset.TOP}>
        <Text category="h1">SYSACAD</Text>
        <Text category="p1">UTN FRSF</Text>
      </SafeAreaLayout>
      {/* FORM */}
      <View style={styles.formContainer}>
        <Text>Legajo</Text>
        <TinyHorizontalSpacer />
        <Input
          placeholder="Nro de legajo..."
          keyboardType="numeric"
          size="large"
          value={legajo}
          onChangeText={setLegajo}
        />
        <TinyHorizontalSpacer />
        <Text>Contraseña</Text>
        <TinyHorizontalSpacer />
        <Input
          placeholder="Contraseña..."
          secureTextEntry={secureTextEntry}
          size="large"
          value={password}
          icon={passwordIcon}
          onChangeText={setPassword}
          onIconPress={() => {
            setSecureTextEntry(!secureTextEntry);
          }}
        />
        <SmallHorizontalSpacer />
        <Button
          style={styles.loginButton}
          size="large"
          disabled={loginPressed}
          icon={loginPressed ? () => <ActivityIndicator /> : undefined}
          onPress={() => {
            setLoginPressed(true);
          }}
        >
          {loginPressed ? "INGRESANDO..." : "INGRESAR"}
        </Button>
      </View>

      {/* SOCIAL MEDIA / LINKS  */}
      <SafeAreaLayout level="1" insets={SaveAreaInset.BOTTOM}>
        <Button
          status="control"
          appearance="outline"
          style={{ alignSelf: "center" }}
          size="small"
          icon={githubIcon}
          onPress={() =>
            Linking.openURL("https://github.com/eldroan/sysacad-mobile")
          }
        >
          ERRORES? QUERÉS COLABORAR?
        </Button>
        <TinyHorizontalSpacer />
        <Text appearance="hint" style={styles.infoText}>
          Esta aplicación no tiene soporte oficial de la UTN FRSF. El código de
          la aplicación y de la API utilizada son públicos y pueden ser vistos
          en github.
        </Text>
        <TinyHorizontalSpacer />
        <Text appearance="hint" style={styles.centeredText}>
          {`V ${expo.version}`}
        </Text>
        <TinyHorizontalSpacer />
      </SafeAreaLayout>
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
  formContainer: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
    maxWidth: bigScreens.maxWidth,
    justifyContent: "center",
    paddingHorizontal: padding.medium,
  },
  centeredText: {
    textAlign: "center",
  },
  infoText: {
    textAlign: Platform.OS == "web" ? "center" : "justify",
    paddingHorizontal: padding.medium,
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: { alignSelf: "center" },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
