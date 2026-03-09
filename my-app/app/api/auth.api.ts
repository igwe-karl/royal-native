import { api } from "./client";

export const loginApi = async (email: string, password: string) => {
  const res = await api.post("/auth/users", { email, password });
  console.log(res.data, "login res");
  return res;
};

export const registerApi = async (email: string, password: string) => {
  const res = await api.post("/auth/register", { email, password });
  console.log(res.data, "register res");
  return res;
};