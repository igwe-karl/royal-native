// screens/ProfileScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import { Button } from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAuth } from "../auth/authContext";
import BookingHistoryCard from "@/components/bookingHistoryCard";
import PaymentCard from "@/components/paymentCard";

const MENU_ITEMS = [
  {
    title: "Settings",
    icon: "settings-outline",
    route: "/(tabs)/profile" as const,
  },
  {
    title: "My Addresses",
    icon: "location-outline",
    route: "/(tabs)/wallet" as const,
  },
  {
    title: "Orders",
    icon: "receipt-outline",
    route: "/screens/ordersList" as const,
  },
];

export default function ProfileScreen() {

  const { logout, user } = useAuth();

  console.log(user, "users detais")
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.replace("/screens/login");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://i.pravatar.cc/300",
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{user?.fname}  {user?.lname}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        {/* Menu Section */}
        <View style={styles.menu}>
          {MENU_ITEMS.map((item) => (
            <Pressable
              key={item.title}
              style={styles.menuItem}
              // onPress={() => router.push(item.route)}
            >
              <View style={styles.menuLeft}>
                <Ionicons name={item.icon as any} size={22} color="#ED6C00" />
                <Text style={styles.menuText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </Pressable>
          ))}
        </View>

        <View style={styles.booking}>
          <Text style={styles.bookingText}>Booking History</Text>

          <BookingHistoryCard
            icon="calendar-outline"
            iconBgColor="#E0F2FE"
            iconColor="#0284C7"
            title="Hotel Reservation"
            subtitle="12 Jan 2026 • Lagos"
            badgeText="Completed"
            badgeColor="#16A34A"
          />

          <BookingHistoryCard
            icon="airplane-outline"
            iconBgColor="#FEF3C7"
            iconColor="#D97706"
            title="Flight to Abuja"
            subtitle="2 Feb 2026 • Economy"
            badgeText="Pending"
            badgeColor="#F59E0B"
          />
        </View>

        <View style={styles.paymentSection}>
          <Text style={styles.bookingText}>Payment Method</Text>

          <PaymentCard
            cardImage={require("../../assets/images/card.png")}
            title="Visa •••• 1234"
            subtitle="Expires 09/28"
            isDefault
            onRemove={() => console.log("Remove")}
            onSetDefault={() => console.log("Set Default")}
          />

          <PaymentCard
            cardImage={require("../../assets/images/card.png")}
            title="Mastercard •••• 5678"
            subtitle="Expires 11/27"
            onRemove={() => console.log("Remove")}
            onSetDefault={() => console.log("Set Default")}
          />
        </View>

        <View style={styles.logoutContainer}>
          <Button
            variant="ghost"
            onPress={handleLogout}
          >
            <IconSymbol
              size={22}
              color="#7F1945"
              name="rectangle.portrait.and.arrow.right"
            />
            <Text >Log out</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: "white",
  },
  header: {
    alignItems: "center",
    paddingVertical: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    // color: "white",
  },
  email: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 4,
  },

  /* Menu */
  menu: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#1E293B",
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuText: {
    fontSize: 16,
    // color: "white",
    fontWeight: "600",
  },
  logoutContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  booking: {
    paddingHorizontal: 16,
    alignItems: "flex-start",
    fontSize: 16,
    fontWeight: "600",
  },
  bookingText: {
    paddingHorizontal: 16,
    alignItems: "flex-start",
    fontSize: 16,
    fontWeight: "600",
  },
  paymentSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  }
});