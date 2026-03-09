// components/ui/Checkbox.tsx
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type CheckboxProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
};

export default function Checkbox({ value, onChange, label }: CheckboxProps) {
  return (
    <Pressable style={styles.container} onPress={() => onChange(!value)}>
      <View style={[styles.box, value && styles.boxChecked]}>
        {value && <Ionicons name="checkmark" size={16} color="white" />}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  box: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#ED6C00",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  boxChecked: {
    backgroundColor: "#ED6C00",
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    // color: "white",
  },
});