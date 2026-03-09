import * as SecureStore from "expo-secure-store";

export const saveTokens = async (access: string, refresh: string) => {
  await SecureStore.setItemAsync("accessToken", access);
  
  await SecureStore.setItemAsync("refreshToken", refresh);
};

export const getAccessToken = async (): Promise<string | null> => {
  const token = await SecureStore.getItemAsync("accessToken");
  console.log(token, "accesstoken")
  return token;
};

export const getRefreshToken = async (): Promise<string | null> => {
  const token = await SecureStore.getItemAsync("refreshToken");
  return token;
};

export const clearTokens = async () => {
  await SecureStore.deleteItemAsync("accessToken");
  await SecureStore.deleteItemAsync("refreshToken");
};