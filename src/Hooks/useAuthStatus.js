import { jwtDecode } from "jwt-decode";

function useAuthStatus() {
  const token = localStorage.getItem("user_token");
  if (!token) return { token: null, isValid: false };

  try {
    const decoded = jwtDecode(token);
    const isValid = Math.floor(Date.now() / 1000) < decoded.exp;
    if (!isValid) localStorage.removeItem("user_token");
    return { token, isValid };
  } catch {
    localStorage.removeItem("user_token");
    return { token: null, isValid: false };
  }
}

export default useAuthStatus;