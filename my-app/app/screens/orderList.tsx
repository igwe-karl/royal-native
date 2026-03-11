// app/(tabs)/orderList.tsx – order list populated from Firebase Realtime Database
import OrderCard from "@/components/orderCard";
import { Button } from "@/components/ui/button";
import { useOffers } from "@/app/hooks/useOffers";
import type { IOffer } from "@/utils/types";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    FlatList,
    Modal,
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DEFAULT_AVATAR = "https://i.pravatar.cc/150?img=3";

function formatDistance(d: unknown): string {
    if (typeof d === "number") return d >= 1000 ? `${(d / 1000).toFixed(1)} km` : `${d} m`;
    if (typeof d === "string") return d;
    return "—";
}

function offerToCardProps(offer: IOffer) {
    const amount =
        typeof offer.amount === "number"
            ? `₦${Number(offer.amount).toLocaleString()}`
            : String(offer.amount ?? "—");
    return {
        offerId: offer.offerId ?? (offer as { id?: string }).id ?? "",
        order_id: offer.order_id ?? "",
        carrier_name: String(offer.carrier_name ?? (offer as { name?: string }).name ?? "Carrier"),
        rating: Number(offer.rating) || 0,
        distance: formatDistance(offer.distance),
        duration: offer.duration ?? "—",
        amount,
        avatar: offer.avatar ?? DEFAULT_AVATAR,
    };
}

export default function OrderListScreen() {
    const { orderId } = useLocalSearchParams<{ orderId?: string }>();
    const { offers, loading, error } = useOffers();
    const [modalVisible, setModalVisible] = useState(false);
    const [acceptedOffer, setAcceptedOffer] = useState<IOffer | null>(null);

    const filteredOffers = useMemo(() => {
        if (!orderId) return offers;
        return offers.filter((o) => (o.order_id ?? (o as { orderId?: string }).orderId) === orderId);
    }, [offers, orderId]);

    const handleAccept = (offer: IOffer) => {
        setAcceptedOffer(offer);
        setModalVisible(true);
    };

    const handleReject = () => {
        // Could update Firebase to mark offer as rejected if needed
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        const offer = acceptedOffer;
        setAcceptedOffer(null);
        if (offer) {
            const orderId = offer.order_id ?? offer.id;
            router.push({
                pathname: "./order-details",
                params: { orderId },
            });
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.centered}>
                <ActivityIndicator size="large" />
                <Text style={styles.helperText}>Loading offers...</Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
            </SafeAreaView>
        );
    }

    if (!filteredOffers.length) {
        return (
            <SafeAreaView style={styles.centered}>
                <Text style={styles.helperText}>
                    {orderId ? "No offers for this order yet" : "No offers yet"}
                </Text>
                <Text style={styles.subText}>
                    {orderId
                        ? "Carrier offers for this order will appear here."
                        : "New delivery offers will appear here."}
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={filteredOffers}
                keyExtractor={(item) => item.offerId ?? (item as { id?: string }).id ?? ""}
                renderItem={({ item }) => {
                    const props = offerToCardProps(item);
                    return (
                        <OrderCard
                            {...props}
                            onAccept={() => handleAccept(item)}
                            onReject={() => handleReject()}
                        />
                    );
                }}
            />

            <Modal
                transparent
                animationType="slide"
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Offer Accepted ✅</Text>
                        <Button onPress={handleCloseModal}>Close</Button>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    helperText: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 12,
        color: "#374151",
    },
    subText: {
        fontSize: 14,
        color: "#6B7280",
        marginTop: 8,
    },
    errorText: {
        fontSize: 16,
        color: "#DC2626",
        textAlign: "center",
    },
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
