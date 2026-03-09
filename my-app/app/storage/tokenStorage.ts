import * as SecureStore from "expo-secure-store";

export const saveAccessToken = async (token: string) => {
  if (!token) throw new Error("Cannot save empty token");
  await SecureStore.setItemAsync("accessToken", token);
};

export const getAccessToken = async () => {
  const token = await SecureStore.getItemAsync("accessToken");
  return token ?? null;
};

export const clearAccessToken = async () => {
  await SecureStore.deleteItemAsync("accessToken");
};