import { validateEmail, validatePassword } from "@/utils/validation";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import AppKeyboardAvoid from "@/components/AppKeyboardAvoid";
import FormErrorText from "@/components/FormErrorText";
import { useAuth } from "@/context/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  console.log(user);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(validateEmail(text));
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(validatePassword(text));
  };

  const validateFields = () => {
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);

    setEmailError(eErr);
    setPasswordError(pErr);

    return !eErr && !pErr;
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    try {
      await login(email.trim(), password.trim());
      router.replace("/(app)");
    } catch (err: any) {
      Alert.alert("Login Failed", err.message || "Invalid email or password.");
    }
  };

  return (
    <AppKeyboardAvoid>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>
        Enter your credentials to access the app.
      </Text>

      <View style={styles.form}>
        <AppInput
          label="Email"
          placeholder="you@example.com"
          keyboardType="email-address"
          value={email}
          onChangeText={handleEmailChange}
        />
        <FormErrorText message={emailError} />

        <AppInput
          label="Password"
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />
        <FormErrorText message={passwordError} />

        <AppButton label="Sign In" onPress={handleLogin} loading={false} />

        <Pressable
          style={styles.linkButton}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.linkButtonLabel}>Need an account? Register</Text>
        </Pressable>
      </View>
    </AppKeyboardAvoid>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 8,
    color: "#666",
  },
  form: {
    marginTop: 40,
    gap: 16,
  },
  linkButton: {
    paddingVertical: 8,
  },
  linkButtonLabel: {
    textAlign: "center",
    color: "#444",
  },
});
