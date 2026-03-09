import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/input";
import React, { useState } from "react";
import { Text, StyleSheet, View, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../auth/authContext";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push("/(tabs)/profile");
    } catch (error: any) {
      console.log("Login error:", error?.response?.data ?? error?.message ?? error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          {/* Logo */}
          <Image
            source={require("../../assets/images/logo.png")} // replace with your logo path
            style={styles.logo} 
            resizeMode="contain"
          />

          {/* Welcome / Title */}
          <Text style={styles.title}>
            Log in to keep your parcels safe and on the move.
          </Text>

          {/* Form Inputs */}
          <View style={styles.form}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter Email"
              type="text"
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              type="text"
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttons}>
            <Button onPress={handleLogin}>Log in</Button>
            <Button variant="outline" onPress={() => router.push("../screens/register")}>
              Create Account
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white", // dark background
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 170,
    height: 150,
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    // color: "white",
    textAlign: "center",
    marginBottom: 32,
  },
  form: {
    width: "100%",
    marginBottom: 32,
  },
  buttons: {
    width: "100%",
    justifyContent: "space-between",
    gap: 16, // spacing between buttons (React Native >=0.70)
  },
});