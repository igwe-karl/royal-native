import axios from "axios";
import { getAccessToken } from "../storage/tokenStorage";

export const api = axios.create({
  baseURL: "https://api.yourserver.com",
});

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});