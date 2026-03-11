import axios from "axios";
import { getAccessToken } from "../storage/tokenStorage";

const API_BASE_URL =
  typeof process !== "undefined" ? process.env?.EXPO_PUBLIC_API_BASE_URL : undefined;

if (!API_BASE_URL) {
  throw new Error(
    "Missing EXPO_PUBLIC_API_BASE_URL. Add it to your .env file (and do not commit .env).",
  );
}

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});