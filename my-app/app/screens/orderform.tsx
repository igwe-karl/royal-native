// screens/OrderFormScreen.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Animated,
  Easing,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, FormProvider, Controller, useFormContext } from "react-hook-form";
import { IOrders, CARRIER_TYPES } from "@/utils/types";
import TextInput from "@/components/ui/input";
import { createOrder } from "../api/order.api";
import { useAuth } from "../auth/authContext";
import { showToast } from "@/utils/toast";
import { router } from "expo-router";


export default function OrderFormScreen() {
  const { user } = useAuth();

  const { width } = Dimensions.get("window");

  const calculateDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (v: number) => (v * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const estimatePrice = (distanceKm: number, weight: number) => {
    const base = 1500;
    const perKm = 400;
    const weightFee = weight * 50;
    return Math.round(base + distanceKm * perKm + weightFee);
  };

  // ------------------ STEP 1: FORM INPUTS ------------------
  const FormStep = () => {
    const { control, watch } = useFormContext<IOrders>();
    const carrierType = watch("carrier_type");

    return (
      <ScrollView contentContainerStyle={styles.formContent}>
        <Text style={styles.title}>Create Delivery Order 📦</Text>

        <Controller
          control={control}
          name="origin_address"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Pickup address"
              placeholder="Enter pickup address"
              value={value || ""}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="destination_address"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Destination address"
              placeholder="Enter destination address"
              value={value || ""}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Item description"
              placeholder="What are you sending?"
              value={value || ""}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="item_weight"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Item weight (kg)"
              placeholder="e.g. 5"
              value={value?.toString() || ""}
              onChangeText={onChange}
              type="number"
            />
          )}
        />

        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Amount (₦)"
              placeholder="Optional override"
              value={value?.toString() || ""}
              onChangeText={(text) => onChange(Number(text) || 0)}
              type="number"
            />
          )}
        />

        <Controller
          control={control}
          name="carrier_type"
          render={({ field: { onChange } }) => (
            <View style={{ marginTop: 8 }}>
              <Text style={styles.sectionLabel}>Carrier type</Text>
              <View style={styles.carrierRow}>
                {CARRIER_TYPES.map((c) => {
                  const active = carrierType === c.id;
                  return (
                    <Pressable
                      key={c.id}
                      onPress={() => onChange(c.id)}
                      style={[
                        styles.carrierChip,
                        active && styles.carrierChipActive,
                      ]}
                    >
                      <Text style={styles.carrierIcon}>{c.icon}</Text>
                      <Text
                        style={[
                          styles.carrierLabel,
                          active && styles.carrierLabelActive,
                        ]}
                      >
                        {c.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          )}
        />
      </ScrollView>
    );
  };

  // ------------------ STEP 2: PRICE ------------------
  const PriceStep = ({
    getValues,
    setValue,
  }: {
    getValues: () => IOrders;
    setValue: (name: keyof IOrders, value: IOrders[keyof IOrders]) => void;
  }) => {
    const vals = getValues();

    if (!vals.origin_latitude) return null;
    const dist = calculateDistanceKm(
      vals.origin_latitude,
      vals.origin_longitude,
      vals.destination_latitude,
      vals.destination_longitude
    );

    const numericWeight = Number(vals.item_weight) || 1;
    const price = estimatePrice(dist, numericWeight);

    // keep the `amount` field in sync with the estimate
    if (vals.amount !== price) {
      setValue("amount", price as IOrders["amount"]);
    }

    return (
      <View>
        <Text style={styles.title}>Price Estimate</Text>
        <Text style={styles.big}>Distance: {dist.toFixed(2)} km</Text>
        <Text style={styles.big}>Estimated Price: ₦{price.toLocaleString()}</Text>
      </View>
    );
  };

  // ------------------ STEP 3: CONFIRM ------------------
  const ConfirmStep = ({ getValues }: { getValues: () => IOrders }) => {
    const vals = getValues();
    console.log(vals, "values of order")
    return (
      <View>
        <Text style={styles.title}>Confirm Order</Text>
        <Text style={styles.big}>Amount: ₦{vals.amount?.toLocaleString?.() ?? vals.amount}</Text>
        <Text>Carrier type: {vals.carrier_type}</Text>
        <Text>From: {vals.origin_address}</Text>
        <Text>To: {vals.destination_address}</Text>
        <Text>Item: {vals.description}</Text>
        <Text>Weight: {vals.item_weight} kg</Text>
      </View>
    );
  };

  const methods = useForm<IOrders>({
    defaultValues: {
      amount: 0,
      order_type: "self",
      origin_address: "2, Femi Odutayo Close, Ikorodu, Lagos, 104101, Nigeria",
      destination_address:
        "Omole Phase 1, Isheri, Ojodu/Agidingbi/Omole 101233, Lagos, Nigeria",
      origin_latitude: 6.6460103,
      origin_longitude: 3.4973448,
      destination_latitude: 6.6375968,
      destination_longitude: 3.3557854,
      // ride_time: new Date().toISOString(),
      ride_time: 1764178140,

      first_name: "igwe",
      last_name: "chi",
      email: "user33@yopmail.com",
      description: "get rich",
      item_value: "10",
      item_weight: "1",
      additional_info: "asdf",
      corespondant_name: "frerwds",
      corespondant_phone: "0813453100",
      isUserRecipient: true,
      carrier_type: CARRIER_TYPES[0].id,
      user_id: user?.id,
    },
  });

  const { getValues, setValue, handleSubmit, formState } = methods;
  console.log(formState.errors, "formstate")
  // Keep the authenticated user attached to the form once it becomes available
  useEffect(() => {
    if (user?.id) {
      setValue("user_id", user.id as IOrders["user_id"]);
    }
  }, [user?.id, setValue]);

  const [step, setStep] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const animate = (dir: number) => {
    Animated.timing(slideAnim, {
      toValue: dir * -width,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const next = () => {
    if (step < 2) {
      animate(step + 1);
      setStep(step + 1);
    }
  };

  const prev = () => {
    if (step > 0) {
      animate(step - 1);
      setStep(step - 1);
    }
  };

  const onSubmit = async (data: IOrders) => {
    try {
      if (!user?.id) {
        showToast("You must be logged in to create an order", "error");
        return;
      }

      const payload: IOrders = {
        ...data,
        user_id: user.id as IOrders["user_id"],
      };

      const created = await createOrder(payload);
      const orderId = created?.order._id;

      if (!orderId) {
        showToast("Order created but could not open details.", "success");
        return;
      }
      showToast("Order created successfully! 🎉", "success");
      router.push({
        pathname: "./orderList",
        params: { orderId: String(orderId) },
      });
    } catch (error) {
      console.error("Failed to create order", error);
      showToast("Failed to create order. Please try again.", "error");
    }
  };

  return (
    <FormProvider {...methods}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white", }}>
        <View style={{ flex: 1, padding: 0 }}>
          <Animated.View
            style={{
              flexDirection: "row",
              width: width * 3,
              transform: [{ translateX: slideAnim }],
            }}
          >
            <View style={{
              width, padding: 18
            }}>
              <FormStep />
            </View>
            <View style={{ width, padding: 18 }}>
              <PriceStep getValues={getValues} setValue={setValue} />
            </View>
            <View style={{ width, padding: 18 }}>
              <ConfirmStep getValues={getValues} />
            </View>
          </Animated.View>

          <View style={styles.footer}>
            {step > 0 && (
              <Pressable onPress={prev} style={styles.btnSecondary}>
                <Text>Back</Text>
              </Pressable>
            )}
            <Pressable
              onPress={step === 2 ? handleSubmit(onSubmit) : next}
              style={styles.btnPrimary}
            >
              <Text style={{ color: "white" }}>
                {step === 2 ? "Submit" : "Next"}
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  title:
    { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  big: {
    fontSize: 18,
    marginBottom: 12
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    padding: 18
  },
  btnPrimary: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center"
  },
  btnSecondary: {
    backgroundColor: "#E5E7EB",
    padding: 14,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center"
  },
  formContent: {
    paddingBottom: 40,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  carrierRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  carrierChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "white",
  },
  carrierChipActive: {
    borderColor: "#2563EB",
    backgroundColor: "#EFF6FF",
  },
  carrierIcon: {
    marginRight: 6,
  },
  carrierLabel: {
    fontSize: 14,
    color: "#111827",
  },
  carrierLabelActive: {
    color: "#1D4ED8",
    fontWeight: "600",
  },
});




