# React Native Authentication App (Expo)

A simple React Native Expo application demonstrating user authentication using **Context API**, **Expo Router**, and **AsyncStorage**.

---

## 🚀 Features

- **User Registration**
- **User Login**
- **Logout Functionality**
- **AuthContext Global State Management**
- **Protected Routes**
- **Reusable Components**
  - AppButton
  - AppInput
  - FormErrorText
  - AppKeyboardAvoid
- **Form Validation**
- **User Info Card Display**

---

## 📦 Project Setup

### 1️⃣ Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

## ▶️ Run the App

```bash
npx expo start
```

- Press **i** to open iOS Simulator  
- Press **a** to open Android Emulator  
- Scan QR with Expo Go on your device  

---

## 📁 Folder Structure

```
app/
 ├─ (auth)/        # Login & Register screens
 ├─ (app)/         # Protected Home screen
 ├─ _layout.tsx    # Root wrapper for AuthProvider
components/        # Reusable UI components
context/           # AuthContext for login/signup/logout
utils/             # Validation helpers
hooks/             # Custom reusable hooks (e.g., useAuthRedirect)
```

---

## 🔐 Authentication Flow

- User signs up → stored in AsyncStorage → redirected to `(app)`
- User logs in → checked against stored data → redirected to `(app)`
- User logs out → cleared from AsyncStorage → redirected to `(auth)`
- Protected screens require login (using ProtectedRoute)

---

## 🧩 Reusable Components

### ✔ AppInput
Styled input with optional secure text and password visibility toggle.

### ✔ AppButton
Primary / Outline button with optional loading state.

### ✔ FormErrorText
Standardized validation error display.

### ✔ AppKeyboardAvoid
Handles keyboard overlapping on mobile screens.

---

## 📝 Validation

Utility functions inside `utils/validation.ts`:

- `validateName()`
- `validateEmail()`
- `validatePassword()`

Used by both Login & Register screens.

---

## 🎉 Summary

This project is a clean starter for any Expo Router app requiring authentication.  
You can easily extend it with API integration, user profiles, or advanced navigation.

Enjoy building! 🚀
# rn-test
