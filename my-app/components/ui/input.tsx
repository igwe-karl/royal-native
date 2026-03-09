import React from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  KeyboardTypeOptions,
  View,
  Text,
} from "react-native";

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  type?: "text" | "number";
  placeholderTextColor?: string
  label?: string
};

function TextInput({
  value,
  onChangeText,
  placeholder,
  type = "text",
  placeholderTextColor = "black",
  label
}: InputProps) {
  const keyboardType: KeyboardTypeOptions =
    type === "number" ? "numeric" : "default";

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <RNTextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        keyboardType={keyboardType}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "white",
    color: "black"
  },
  label: {
    // backgroundColor: "white",
    color: "black"
  }
});

export default TextInput