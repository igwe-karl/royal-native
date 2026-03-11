// app/auth/authGuard.tsx
import { ActivityIndicator, View, Text } from "react-native";
import { useAuth } from "./authContext";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { authState } = useAuth();

  if (authState === "loading") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (authState === "unauthenticated") {
    return <Text>Please login</Text>; // or redirect to a login screen using expo-router
  }

  // authenticated
  return <>{children}</>;
}

export default AuthGuard;