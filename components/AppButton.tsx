import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

interface AppButtonProps {
  label: string;
  onPress: () => void;
  outline?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export default function AppButton({
  label,
  onPress,
  outline = false,
  loading = false,
  style,
  labelStyle,
}: AppButtonProps) {
  const isDisabled = loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        outline ? styles.outline : styles.solid,
        isDisabled && { opacity: 0.6 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={outline ? "#111" : "#fff"} />
      ) : (
        <Text
          style={[
            styles.label,
            outline ? styles.outlineLabel : styles.solidLabel,
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  // Solid Primary
  solid: {
    backgroundColor: "#111",
  },
  solidLabel: {
    color: "#fff",
    fontWeight: "600",
  },

  // Outline variant
  outline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#111",
  },
  outlineLabel: {
    color: "#111",
    fontWeight: "600",
  },

  label: {
    fontSize: 16,
  },
});