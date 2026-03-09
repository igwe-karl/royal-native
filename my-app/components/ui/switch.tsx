// components/ui/ToggleSwitch.tsx
import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

type ToggleSwitchProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
};

export default function ToggleSwitch({
  value,
  onChange,
  label,
}: ToggleSwitchProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: "#767577", true: "#ED6C00" }}
        thumbColor={value ? "#fff" : "#f4f3f4"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "white",
  },
});