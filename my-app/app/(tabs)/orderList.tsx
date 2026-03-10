// app/(tabs)/orders.tsx
import OrderCard from "@/components/orderCard";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Modal, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrdersScreen() {
    const [orders, setOrders] = useState([
        {
            id: "1",
            name: "Jane Doe",
            rating: 4.5,
            distance: "5 km",
            duration: "15 min",
            amount: "$25",
            avatar: "https://i.pravatar.cc/150?img=3",
        },
        {
            id: "2",
            name: "Bro Doe",
            rating: 4.5,
            distance: "5 km",
            duration: "20 min",
            amount: "$20",
            avatar: "https://i.pravatar.cc/150?img=3",
        },
    ]);

    const [modalVisible, setModalVisible] = useState(false);

    const handleAccept = () => {
        setModalVisible(true);
        // setOrders({})
    };

    const handleReject = () => {
        console.log("Order rejected");
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <OrderCard
                        {...item}
                        onAccept={handleAccept}
                        onReject={handleReject}
                    />
                )}
            />

            <Modal
                transparent
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Offer Accepted ✅</Text>
                        <Button onPress={() => {
                            setModalVisible(false)
                            router.push({
                                pathname: '/(tabs)/order-details',
                                params: { order: JSON.stringify(orders) },
                            });
                        }}>Close</Button>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: 300,
        backgroundColor: "#fff",
        padding: 24,
        borderRadius: 12,
        alignItems: "center",
    },
    modalText: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
});