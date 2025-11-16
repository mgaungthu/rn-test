import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { Stack } from "expo-router";


export default function AppLayout() {

  useAuthRedirect();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}