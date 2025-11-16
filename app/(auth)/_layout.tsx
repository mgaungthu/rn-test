import { useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";

export default function AuthLayout() {
  
  const { loading } = useAuth();

  if (loading) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
