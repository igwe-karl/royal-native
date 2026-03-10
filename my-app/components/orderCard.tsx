// components/OrderCard.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type OrderCardProps = {
  avatar: string;
  name: string;
  rating: number;
  distance: string;
  duration: string;
  amount: string;
  onAccept: () => void;
  onReject: () => void;
};

export default function OrderCard({
  avatar,
  name,
  rating,
  distance,
  duration,
  amount,
  onAccept,
  onReject,
}: OrderCardProps) {
  return (
    <View style={styles.card}>
      {/* Left: Avatar */}
      <Image source={{ uri: avatar }} style={styles.avatar} />

      {/* Middle: Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>

        <View style={styles.detailsRow}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{rating.toFixed(1)}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.detail}>{distance}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.detail}>{duration}</Text>
        </View>

        <Text style={styles.amount}>{amount}</Text>
      </View>

      {/* Right: Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.button, styles.accept]} onPress={onAccept}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.reject]} onPress={onReject}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginVertical: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  rating: {
    marginLeft: 4,
    marginRight: 6,
    color: "#555",
  },
  dot: {
    marginHorizontal: 4,
    color: "#555",
  },
  detail: {
    color: "#555",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ED6C00",
  },
  actions: {
    flexDirection: "column",
    marginLeft: 12,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 2,
  },
  accept: {
    backgroundColor: "#16A34A",
  },
  reject: {
    backgroundColor: "#EF4444",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});