import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
} from "react-native";

type Props = {
    cardImage?: any;
    title: string;
    subtitle: string;

};

export default function BankCard({
    cardImage,
    title,
    subtitle,
}: Props) {
    return (
        <View style={styles.wrapper}>
            <Pressable style={styles.card}>
                <View style={styles.left}>
                    <Image source={cardImage} style={styles.cardImage} />
                    <View>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>{subtitle}</Text>
                    </View>
                </View>
            </Pressable>

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
        backgroundColor: "#FDF2F8",
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

    dot: {
        width: 5,
        height: 5,
        borderRadius: 3,
        backgroundColor: "#9CA3AF",
    },
});

