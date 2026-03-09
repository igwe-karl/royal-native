import React, { createContext, useContext, useEffect, useState } from "react";
import { saveTokens, clearTokens, getAccessToken } from "../storage/tokenStorage";
import { loginApi, registerApi } from "../api/auth.api";

type AuthContextType = {
  userToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
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

  const login = async (email: string, password: string) => {
    const res = await loginApi(email, password);
    console.log(res, "res")
    const { accessToken, refreshToken } = res.data;
    await saveTokens(accessToken, refreshToken);
    setUserToken(accessToken);
  };

  const register = async (email: string, password: string) => {
    const res = await registerApi(email, password);
    const { accessToken, refreshToken } = res.data;
    await saveTokens(accessToken, refreshToken);
    setUserToken(accessToken);
  };

  const logout = async () => {
    await clearTokens();
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
}