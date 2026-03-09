import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/input";
import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../auth/authContext";
import { router } from "expo-router";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            console.log({ email, password });
            await login(email, password);
            router.push('/(tabs)/profile')
        } catch (error: any) {
            if (error?.response) {
                console.log(
                    "Login error response",
                    error.response.status,
                    error.response.data
                );
            } else {
                console.log("Login error", error?.message || error);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome Back 👋</Text>

            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email Address"
            />

            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
            />

            <Button onPress={handleLogin}>Log in</Button>

            <Button
                variant="outline"
                onPress={() => console.log("Go to Register")}
            >
                Create Account
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 30,
        textAlign: "center",
    },
});