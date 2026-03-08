import { api } from "./client";

export const loginApi = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

export const registerApi = (email: string, password: string) =>
  api.post("/auth/register", { email, password });