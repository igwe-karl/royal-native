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
  cardImage: any;
  title: string;
  subtitle: string;
  isDefault?: boolean;
  badgeText: string;
  badgeColor?: string
};

export default function ServiceCard({
  cardImage,
  title,
  subtitle,
  isDefault = false,
  badgeText,
  badgeColor = "#16A34A",
}: Props) {
  return (
    <View style={styles.wrapper}>
      {/* Top Row */}
      <Pressable style={styles.card}>
        <View style={styles.top}>
          <Image source={cardImage} style={styles.cardImage} />
          <View style={[styles.badge, { backgroundColor: badgeColor }]}>
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        </View>

        <View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
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
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
  },

  top: {
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

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
});