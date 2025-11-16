
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { useAuth } from "@/context/AuthContext";

import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import AppKeyboardAvoid from "@/components/AppKeyboardAvoid";
import FormErrorText from "@/components/FormErrorText";
import { validateEmail, validateName, validatePassword } from "@/utils/validation";

export default function RegisterScreen() {
  
  const router = useRouter();
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleNameChange = (text: string) => {
    setName(text);
    if (!text.trim()) setNameError("Name is required");
    else setNameError("");
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    const emailRegex = /\S+@\S+\.\S+/;
    if (!text.trim()) setEmailError("Email is required");
    else if (!emailRegex.test(text)) setEmailError("Invalid email format");
    else setEmailError("");
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (!text.trim()) setPasswordError("Password is required");
    else if (text.length < 6) setPasswordError("Password must be at least 6 characters");
    else setPasswordError("");
  };

  const validateFields = () => {
    let valid = true;

    setNameError('');
    setEmailError('');
    setPasswordError('');

    const nErr = validateName(name);
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);

    if (nErr) {
      setNameError(nErr);
      valid = false;
    }
    if (eErr) {
      setEmailError(eErr);
      valid = false;
    }
    if (pErr) {
      setPasswordError(pErr);
      valid = false;
    }

    return valid;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;

    try {
      await signup(name.trim(), email.trim(), password.trim());
      router.replace("/(auth)/login");
    } catch (err: any) {
      Alert.alert("Signup Failed", err.message || "Unable to create account.");
    }
  };

  return (
    <AppKeyboardAvoid>
      <Text style={styles.title}>Create account</Text>
      <Text style={styles.subtitle}>Sign up to sync your data across devices.</Text>

      <View style={styles.form}>
        <AppInput
          label="Full name"
          placeholder="Mg mg"
          value={name}
          onChangeText={handleNameChange}
        />
        <FormErrorText message={nameError} />

        <AppInput
          label="Email"
          placeholder="you@email.com"
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

        <AppButton label="Create Account" onPress={handleRegister} />

        <Pressable style={styles.linkButton} onPress={() => router.push('/login')}>
          <Text style={styles.linkButtonLabel}>Have an account? Login</Text>
        </Pressable>
      </View>

    </AppKeyboardAvoid>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 8,
    color: '#666',
  },
  form: {
    marginTop: 40,
    gap: 16,
  },
  linkButton: {
    paddingVertical: 8,
  },
  linkButtonLabel: {
    textAlign: 'center',
    color: '#444',
  },
});
