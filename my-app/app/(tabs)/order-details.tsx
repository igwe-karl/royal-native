// app/(tabs)/order-details.tsx
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { getOrder } from "../api/order.api";
import { IOrders } from "@/utils/types";

export default function OrderDetailsScreen() {
    const params = useLocalSearchParams<{ orderId?: string }>();
    const orderId = params.orderId;
    const [order, setOrder] = useState<IOrders | null>(null);
    const [loading, setLoading] = useState(!!orderId);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!orderId) {
            setError("No order ID provided.");
            return;
        }
        let cancelled = false;
        setLoading(true);
        setError(null);
        getOrder(orderId)
            .then((data) => {
                if (!cancelled) {
                    setOrder(data as IOrders);
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(err?.message ?? "Failed to load order.");
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [orderId]);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" />
                <Text style={styles.loadingText}>Loading order...</Text>
            </SafeAreaView>
        );
    }
    if (error || !order) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>{error ?? "Order not found."}</Text>
            </SafeAreaView>
        );
    }
    const recipientName = order.receiver_name ?? ([order.first_name, order.last_name].filter(Boolean).join(" ") || order.corespondant_name);
    const recipientPhone = order.receiver_phone ?? order.corespondant_phone;

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Order Summary</Text>
            <Text style={styles.label}>Order ID</Text>
            <Text style={styles.value}>{order.id}</Text>
            <Text style={styles.label}>Item</Text>
            <Text style={styles.value}>{order.description}</Text>
            <Text style={styles.label}>Recipient</Text>
            <Text style={styles.value}>{recipientName}</Text>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{recipientPhone}</Text>
            <Text style={styles.label}>Weight</Text>
            <Text style={styles.value}>{order.item_weight} kg</Text>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.value}>₦{Number(order.amount).toLocaleString()}</Text>
            <Text style={styles.label}>Pickup</Text>
            <Text style={styles.value}>{order.origin_address}</Text>
            <Text style={styles.label}>Destination</Text>
            <Text style={styles.value}>{order.destination_address}</Text>
            {order.status != null && (
                <>
                    <Text style={styles.label}>Status</Text>
                    <Text style={styles.value}>{order.status}</Text>
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: "white" },
    title: { fontSize: 20, fontWeight: "700", marginBottom: 16 },
    label: { fontSize: 12, color: "#6B7280", marginTop: 12, marginBottom: 2 },
    value: { fontSize: 16, marginBottom: 4 },
    loadingText: { marginTop: 12, fontSize: 16 },
    errorText: { fontSize: 16, color: "#DC2626" },
});