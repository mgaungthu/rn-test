import { StyleSheet, Text } from "react-native";

export default function FormErrorText({ message }: { message?: string }) {
  if (!message) return null;

  return <Text style={styles.error}>{message}</Text>;
}

const styles = StyleSheet.create({
  error: {
    color: "#d00",
    fontSize: 13,
    marginTop: -10,
    marginBottom: 6,
  },
});