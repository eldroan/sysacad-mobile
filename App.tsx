import React, { useState } from "react";
import {
  AccessibilityRole,
  ImageProps,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  View,
  Text as RNText,
} from "react-native";
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { mapping, light, dark } from "@eva-design/eva";

const heartIcons = ["😻", "💖", "😍", "🥰", "😍", "💝", "😘", "💓", "💕", "🐱"];
const themes = {
  light: {
    theme: light,
    icon: "sun",
    text: "LIGHT",
  },
  dark: {
    theme: dark,
    icon: "moon",
    text: "DARK",
  },
};

type IconProps = {
  name: string;
  style?: ImageStyle;
};

type CustomButtonWithIconProps = {
  accessibilityRole: AccessibilityRole;
  accessibilityLabel: string;
  icon: string;
  iconStyle?: ImageStyle;
  onPress: () => void;
  text: string;
  style: any;
};

const renderIcon = ({ name, style }: IconProps) => (
  <Icon {...style} name={name} />
);

const CustomButtonWithIcon = ({
  accessibilityRole,
  accessibilityLabel,
  icon,
  iconStyle,
  onPress,
  text,
  style,
}: CustomButtonWithIconProps) => {
  const ButtonIcon = () => renderIcon({ name: icon, style: iconStyle });
  return (
    <Button
      style={style}
      icon={ButtonIcon}
      onPress={onPress}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
    >
      {text}
    </Button>
  );
};

const App = (): React.ReactFragment => {
  const [icon, setIcon] = useState(heartIcons[0]);
  const [themeName, setThemeName] = useState("light");
  // @ts-ignore Just so TS doesnt conplain that themeName could be other than "dark" or "light"
  const theme = themes[themeName].theme;

  const changeIcon = () => {
    const index = Math.floor(Math.random() * heartIcons.length);
    setIcon(heartIcons[index]);
  };

  const changeTheme = () => {
    setThemeName(themeName === "light" ? "dark" : "light");
  };

  const { text: themeButtonText, icon: themeButtonIcon } =
    themeName === "light" ? themes.dark : themes.light;

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <Layout style={styles.container}>
          <Text style={styles.text} category="h1">
            Welcome to UI Kitten {icon}
          </Text>
          <Text style={styles.text} category="s1">
            It works great in the browser and as a native app!
          </Text>
          <Text style={styles.text} appearance="hint">
            Click some buttons to see it working.
          </Text>
          <Button
            accessibilityRole="button"
            accessibilityLabel="Change Icon"
            style={styles.iconButton}
            onPress={changeIcon}
          >
            CHANGE ICON
          </Button>
          <CustomButtonWithIcon
            accessibilityRole="button"
            accessibilityLabel="UI Kitten Change Theme"
            style={styles.iconButton}
            text={`SWITCH TO ${themeButtonText} THEME`}
            icon={themeButtonIcon}
            onPress={changeTheme}
            iconStyle={{ tintColor: "white" }}
          />
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Native Change Theme"
            onPress={changeTheme}
          >
            <View style={styles.nativeButton}>
              <RNText>NATIVE CHANGE THEME</RNText>
            </View>
          </TouchableOpacity>
        </Layout>
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  text: {
    textAlign: "center",
  },
  iconButton: {
    marginVertical: 16,
  },
  nativeButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

export default App;