import React, { createContext, useContext, useEffect, useState } from "react";
import { saveAccessToken, getAccessToken, clearAccessToken } from "../storage/tokenStorage";
import { api } from "../api/client";
import { showToast } from "@/utils/toast";
import { IUser } from "@/utils/types";

type AuthContextType = {
  userToken: string | null;
  user: IUser | null;
  authState: "loading" | "authenticated" | "unauthenticated";
  login: (email: string, password: string, deviceToken?: string) => Promise<void>;
  register: (fname: string, lname: string, email: string, pnumber: string, password: string, deviceToken?: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [authState, setAuthState] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");
  const [user, setUser] = useState<IUser | null>(null);

  console.log(user, "user is here")
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getAccessToken();

        if (!token) {
          setAuthState("unauthenticated");
          return;
        }

        setUserToken(token);

        // Optional: verify token & get user
        const res = await api.get("/users/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
        setAuthState("authenticated");

      } catch (error) {
        setAuthState("unauthenticated");
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string, deviceToken?: string) => {
    try {
      const res = await api.post("/auth/users", { email, password, deviceTokens: deviceToken });
      const { token, user } = res.data;

      if (!token) throw new Error("Token missing from server response");

      await saveAccessToken(token);
      setUserToken(token);
      setUser(user)
      setAuthState("authenticated");

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
      const { token, user } = res.data;
  
      if (!token) throw new Error("Token missing from server response");
  
      await saveAccessToken(token);
      setUserToken(token);
      setUser(user);
      setAuthState("authenticated");
      showToast("Registration successful! 🎉", "success");
    } catch (error: any) {
      console.log("Register error ❌", error.response?.data ?? error.message);
      throw error;
    }
  };

  const logout = async () => {
    await clearAccessToken();
    setUserToken(null);
    setUser(null);
    setAuthState("unauthenticated");
    showToast("Log Out successful! 🎉", "success");
  };

  return (
    <AuthContext.Provider value={{ userToken, user, authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}