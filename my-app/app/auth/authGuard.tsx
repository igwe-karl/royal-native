import { Text } from "react-native";
import { useAuth } from "./authContext";

function AuthGuard({ children }: any) {
  const { userToken } = useAuth();

  if (!userToken) return <Text>Please login</Text>;

  return children;
}

export default AuthGuard