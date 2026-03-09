// src/components/CustomToast.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const toastConfig = {
    success: ({ text1 }: any) => (
        <View style={[styles.container, { backgroundColor: "#4BB543" }]}>
            <Text style={styles.text}>{text1}</Text>
        </View>
    ),
    error: ({ text1 }: any) => (
        <View style={[styles.container, { backgroundColor: "#FF3333" }]}>
            <Text style={styles.text}>{text1}</Text>
        </View>
    ),
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 20,
        backgroundColor: "red"
    },
    text: {
        color: "white",
        fontWeight: "bold",
    },
});