import React, { createContext, useContext, useEffect, useState } from "react";
import { saveAccessToken, getAccessToken, clearAccessToken } from "../storage/tokenStorage";
import { api } from "../api/client";
import { showToast } from "@/utils/toast";

type AuthContextType = {
  userToken: string | null;
  login: (email: string, password: string, deviceToken?: string) => Promise<void>;
  register: (fname: string, lname: string, email: string, pnumber: string, password: string, deviceToken?: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      if (token) setUserToken(token);
    })();
  }, []);

  const login = async (email: string, password: string, deviceToken?: string) => {
    try {
      const res = await api.post("/auth/users", { email, password, deviceTokens: deviceToken });
      const { token } = res.data;

      if (!token) throw new Error("Token missing from server response");

      await saveAccessToken(token);
      setUserToken(token);
      showToast("Login successful! 🎉", "success"); // ✅ Show toast

    } catch (error: any) {
      console.log("Login error ❌", error.response?.data ?? error.message);
      throw error;
    }
  };

  // REGISTER
  const register = async (fname: string, lname: string, email: string, pnumber: string, password: string, deviceToken?: string) => {
    try {
      const res = await api.post("/users", { fname, lname, pnumber, email, password, deviceTokens: deviceToken });
      const { token } = res.data;

      if (!token) throw new Error("Token missing from server response");

      await saveAccessToken(token);
      setUserToken(token);

      showToast("Registeration successful! 🎉", "success"); // ✅ Show toast
    } catch (error: any) {
      console.log("Register error ❌", error.response?.data ?? error.message);
      throw error;
    }
  };

  const logout = async () => {
    await clearAccessToken();
    setUserToken(null);
    showToast("Log Out successful! 🎉", "success"); // ✅ Show toast
  };

  return (
    <AuthContext.Provider value={{ userToken, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}