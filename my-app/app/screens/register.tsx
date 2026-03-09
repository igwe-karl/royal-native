import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/input";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../auth/authContext";
import { router } from "expo-router";

export default function RegisterScreen() {
  const { register } = useAuth();

  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setEmail] = useState("");
  const [pnumber, setpnumber] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await register(fname, lname, email, pnumber, password);
      router.push("/(tabs)/profile");
    } catch (error: any) {
      console.log(
        "Register error:",
        error?.response?.data ?? error?.message ?? error
      );
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
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Title */}
          <Text style={styles.title}>Create your account to track, send, and receive parcels effortlessly</Text>

          {/* Form */}
          <View style={styles.form}>
            <TextInput
              value={fname}
              onChangeText={setfname}
              placeholder="Enter First Name"
              label="First Name"
            />

            <TextInput
              value={lname}
              onChangeText={setlname}
              placeholder="Enter Last Name"
              label="Last Name"

            />

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email Address"
              label="Email Address"

            />

            <TextInput
              value={pnumber}
              onChangeText={setpnumber}
              placeholder="Enter Phone Number"
              type="number"
              label="Phone Number"

            />

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              label="Enter password"
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              label="confirm password"
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttons}>
            <Button onPress={handleRegister}>Register</Button>

            <Button
              variant="ghost"
              onPress={() => router.back()}
            >
              Already have an account?
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
    // backgroundColor: "#1E1E2D",
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
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 28,
    textAlign: "center",
    // color: "white",
  },
  form: {
    width: "100%",
    marginBottom: 28,
  },
  buttons: {
    width: "100%",
    gap: 16,
  },
});