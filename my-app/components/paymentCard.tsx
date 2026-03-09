import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    cardImage?: any;
    title: string;
    subtitle: string;
    isDefault?: boolean;
    onRemove?: () => void;
    onSetDefault?: () => void;
};

export default function PaymentCard({
    cardImage,
    title,
    subtitle,
    isDefault = false,
    onRemove,
    onSetDefault,
}: Props) {
    return (
        <View style={styles.wrapper}>
            {/* Top Row */}
            <Pressable style={styles.card}>
                <View style={styles.left}>
                    <Image source={cardImage} style={styles.cardImage} />
                    <View>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>{subtitle}</Text>
                    </View>
                </View>

                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </Pressable>

            {/* Bottom Actions */}
            <View style={styles.actions}>
                <Pressable onPress={onRemove}>
                    <Text style={styles.removeText}>Remove Card</Text>
                </Pressable>

                <View style={styles.dot} />

                <Pressable onPress={onSetDefault}>
                    <Text
                        style={[
                            styles.defaultText,
                            isDefault && styles.defaultActive,
                        ]}
                    >
                        {isDefault ? "Default Card" : "Set as Default"}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 18,
    },

    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        padding: 16,
        borderRadius: 16,
        // shadowColor: "#000",
        // shadowOpacity: 0.08,
        // shadowRadius: 10,
        elevation: 1,
    },

    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
    },

    cardImage: {
        width: 46,
        height: 30,
        resizeMode: "contain",
    },

    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
    },

    subtitle: {
        fontSize: 13,
        color: "#6B7280",
        marginTop: 4,
    },

    actions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 10,
        paddingHorizontal: 6,
    },

    removeText: {
        color: "#DC2626",
        fontSize: 13,
        fontWeight: "600",
    },

    defaultText: {
        color: "#2563EB",
        fontSize: 13,
        fontWeight: "600",
    },

    defaultActive: {
        color: "#16A34A",
    },

    dot: {
        width: 5,
        height: 5,
        borderRadius: 3,
        backgroundColor: "#9CA3AF",
    },
});

