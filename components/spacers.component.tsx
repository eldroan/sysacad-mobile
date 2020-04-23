import React from "react";
import { View } from "react-native";
import { padding } from "../assets/uispec";

export const TinyHorizontalSpacer = (): React.ReactElement => (
  <View style={{ height: padding.tiny }} />
);

export const SmallHorizontalSpacer = (): React.ReactElement => (
  <View style={{ height: padding.small }} />
);

export const MediumHorizontalSpacer = (): React.ReactElement => (
  <View style={{ height: padding.medium }} />
);

export const LargeHorizontalSpacer = (): React.ReactElement => (
  <View style={{ height: padding.large }} />
);

export const TinyVerticalSpacer = (): React.ReactElement => (
    <View style={{ width: padding.tiny }} />
  );
  
  export const SmallVerticalSpacer = (): React.ReactElement => (
    <View style={{ width: padding.small }} />
  );
  
  export const MediumVerticalSpacer = (): React.ReactElement => (
    <View style={{ width: padding.medium }} />
  );
  
  export const LargeVerticalSpacer = (): React.ReactElement => (
    <View style={{ width: padding.large }} />
  );