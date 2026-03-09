// screens/RegisterScreen.tsx
import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/input";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function RegisterScreen() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        console.log({ fullName, email, phone, password });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Create Account 🚀</Text>

            <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Full Name"
            />

            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email Address"
            />

            <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone Number"
                type="number"
            />

            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
            />

            <Button onPress={handleRegister} >Register</Button>

            <Button
                variant="outline"
                onPress={() => console.log("Go to Login")}
            >Already have an account?</Button>
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