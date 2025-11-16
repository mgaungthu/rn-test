export const emailRegex = /\S+@\S+\.\S+/;

export function validateName(name: string) {
  if (!name.trim()) return "Name is required";
  return "";
}

export function validateEmail(email: string) {
  if (!email.trim()) return "Email is required";
  if (!emailRegex.test(email)) return "Invalid email format";
  return "";
}

export function validatePassword(password: string) {
  if (!password.trim()) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return "";
}