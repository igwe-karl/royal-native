import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { Button } from "./ui/button";
import { fundWallet, withdraw } from "@/app/api/wallet";
import { router } from "expo-router";

type WalletFormMode = "fund" | "withdraw";

interface WalletFormProps {
    mode: WalletFormMode;
    onSuccess?: () => void;
    onClose?: () => void;
}

const WalletForm: React.FC<WalletFormProps> = ({ mode, onSuccess, onClose }) => {
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const label = mode === "fund" ? "Fund wallet" : "Withdraw funds";

    const handleSubmit = async () => {
        const numericAmount = Number(amount);

        if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
            Alert.alert("Invalid amount", "Please enter a valid amount greater than 0.");
            return;
        }

        try {
            setLoading(true);
            if (mode === "fund") {
                const res = await fundWallet(numericAmount);
                console.log(res, "wallet funds")
                router.push(res.data.authorization_url)
            } else {
                await withdraw(numericAmount);
            }

            Alert.alert("Success", `${label} successful.`);
            setAmount("");

            if (onSuccess) {
                onSuccess();
            }
            if (onClose) {
                onClose();
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{label}</Text>

            <Text style={styles.label}>Amount</Text>
            <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="Enter amount"
                keyboardType="numeric"
                style={styles.input}
            />

            <Button disabled={loading} onPress={handleSubmit}>
                {loading ? (
                    <ActivityIndicator color="#ffffff" />
                ) : (
                    <Text style={styles.buttonText}>{label}</Text>
                )}
            </Button>
        </View>
    );
};

export default WalletForm;

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        padding: 18,
        marginHorizontal: 10,
        backgroundColor: "#F9FAFB",
        borderRadius: 16,
        gap: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0F172A",
    },
    label: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: "#FFFFFF",
        marginBottom: 12,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});

