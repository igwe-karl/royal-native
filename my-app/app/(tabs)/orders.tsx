import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookingHistoryCard from '@/components/bookingHistoryCard';
import { Ionicons } from "@expo/vector-icons";
import SearchInput from '@/components/ui/searchBar';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { router } from 'expo-router';

export default function OrdersScreen() {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: "grey" }]}>
            <Ionicons name={'person'} size={22} color={""} />
          </View>

          <Text style={styles.name}>Hello Edikan</Text>
          <View style={[styles.iconContainer, { backgroundColor: "" }]}>
            <Ionicons name={'notifications-outline'} size={24} color={""} />
          </View>
        </View>

        <View style={styles.search}>
          <SearchInput value={search}
            onChangeText={setSearch}
            placeholder="Search deliveries"></SearchInput>
        </View>

        <View style={styles.mapContainer}>
          <Text style={styles.name}>Carriers near you</Text>
          <Image
            source={require("../../assets/images/map.png")}
            style={styles.mapImage}
          />
        </View>

        <View>
          <Button onPress={()=> router.push("/screens/orderform")}>Create</Button>
        </View>

        <View style={styles.booking}>
          <Text style={styles.deliveryText}>Recent Deliveries</Text>

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
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: 300,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    marginTop: 20,
  },

  mapImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    // color: "white",
  },

  container: {
    paddingBottom: 40,
    backgroundColor: "white",
    paddingVertical: 20,
  },

  booking: {
    paddingHorizontal: 16,
  },

  deliveryText: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    padding: 18,
    justifyContent: "space-between",

  },
  search: {
    width: "100%",

  }
});
