import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  iconBgColor?: string;
  iconColor?: string;
  title: string;
  subtitle: string;
  badgeText: string;
  badgeColor?: string;
};

export default function BookingHistoryCard({
  icon,
  iconBgColor = "#F3F4F6",
  iconColor = "#111827",
  title,
  subtitle,
  badgeText,
  badgeColor = "#16A34A",
}: Props) {
  return (
    <View style={styles.card}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          <Ionicons name={icon} size={22} color={iconColor} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      {/* Badge */}
      <View style={[styles.badge, { backgroundColor: badgeColor }]}>
        <Text style={styles.badgeText}>{badgeText}</Text>
      </View>
    </View>
  );

  
}

const styles = StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "white",
      padding: 16,
      borderRadius: 14,
      marginBottom: 12,
    //   shadowColor: "#000",
    //   shadowOpacity: 0.08,
    //   shadowRadius: 10,
      elevation: 3,
    },
  
    leftSection: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      flex: 1,
    },
  
    iconContainer: {
      width: 46,
      height: 46,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
    },
  
    textContainer: {
      flex: 1,
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