// app/auth/authGuard.tsx
import { ActivityIndicator, View, Text } from "react-native";
import { useAuth } from "./authContext";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";

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
    return <View style={{ backgroundColor: "white", flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button onPress={() => router.push({
        pathname: "./screens/login",
      })}
        variant="primary">
        <Text style={{
          // color: "#000",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 18
        }}>Please login</Text>
      </Button>

    </View >; // or redirect to a login screen using expo-router
  }

  // authenticated
  return <>{children}</>;
}

export default AuthGuard;