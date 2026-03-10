// app/(tabs)/order-details.tsx
import React from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from 'expo-router';

export default function OrderDetailsScreen({ route }: any) {
    // const { order } = route.params;
    const params = useLocalSearchParams();
    const order = params.order ? JSON.parse(params.order as string) : null;

    // console.log(route.params, "router")
    console.log(order, "order")

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Order Summary</Text>
            <Text>Item: {order.itemDesc}</Text>
            <Text>Recipient: {order.fullName}</Text>
            <Text>Phone: {order.recipientPhone}</Text>
            <Text>Weight: {order.weight} Kg</Text>
            <Text>Amount: {order.amount}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: "white" },
    title: { fontSize: 20, fontWeight: "700", marginBottom: 16 },
});