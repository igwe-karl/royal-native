import React from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  KeyboardTypeOptions,
  View,
} from "react-native";

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  type?: "text" | "number";
};

function TextInput({
  value,
  onChangeText,
  placeholder,
  type = "text",
}: InputProps) {
  const keyboardType: KeyboardTypeOptions =
    type === "number" ? "numeric" : "default";

  return (
    <View>
      <RNTextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
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
  },
});

export default TextInput