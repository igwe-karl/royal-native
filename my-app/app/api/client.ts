import axios from "axios";
import { getAccessToken } from "../storage/tokenStorage";

export const api = axios.create({
  // baseURL: "https://api.yourserver.com",
  baseURL: "http://192.168.1.171:4000",
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});