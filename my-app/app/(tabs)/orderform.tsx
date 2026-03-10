// screens/OrderFormScreen.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInput from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";

export default function OrderFormScreen() {
  const [description, setDescription] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [weight, setWeight] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = () => {
    console.log({
      description,
      recipientPhone,
      weight,
      fullName,
    });
    router.push("/(tabs)/orderList"); // go to orders list

    // 👉 Later: Send to backend
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Create Delivery Order 📦</Text>

        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Item Description"
        />

        <TextInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="Recipient Full Name"
        />

        <TextInput
          value={recipientPhone}
          onChangeText={setRecipientPhone}
          placeholder="Recipient Phone Number"
          type="number"
        />

        <TextInput
          value={weight}
          onChangeText={setWeight}
          placeholder="Item Weight (Kg)"
          type="number"
        />

        <Button onPress={handleSubmit}>Submit Order</Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    padding: 20,
    gap: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
});