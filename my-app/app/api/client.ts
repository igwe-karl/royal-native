import axios from "axios";
import { getAccessToken } from "../storage/tokenStorage";

export const api = axios.create({
  // baseURL: "https://api.yourserver.com",
  baseURL: "http://192.168.1.171:4000",
});

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  console.log(token, "token")
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});