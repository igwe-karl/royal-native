import { useContext } from "react";
import { View, Text } from "react-native";
import AuthContext from "./authContext";

function AuthGuard({ children }: any) {
  const { userToken } = useContext(AuthContext);

  if (!userToken) return <Text>Please login</Text>;

  return children;
}

export default AuthGuard