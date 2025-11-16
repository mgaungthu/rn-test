import AppButton from "@/components/AppButton";
import { useAuth } from "@/context/AuthContext";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { logout, user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Welcome</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{user?.name}</Text>
        <Text style={styles.cardSubtitle}>{user?.email}</Text>
      </View>
      <View style={styles.logoutContainer}>
        <AppButton label="Logout" outline onPress={logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 12,
    fontSize: 18,
    color: "#555",
  },
  card: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#f8f8f8",
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  cardSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#666",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 32,
    gap: 12,
  },
  logoutContainer: {
    paddingHorizontal: 10,
    width: "100%",
    marginTop: 30,
  },
});
