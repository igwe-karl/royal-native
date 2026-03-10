import React from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  KeyboardTypeOptions,
  View,
  Text,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  type?: "text" | "number";
  placeholderTextColor?: string;
  label?: string;

  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
};

function TextInput({
  value,
  onChangeText,
  placeholder,
  type = "text",
  placeholderTextColor = "black",
  label,
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
}: InputProps) {
  const keyboardType: KeyboardTypeOptions =
    type === "number" ? "numeric" : "default";

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
        {leftIcon && (
          <Pressable onPress={onLeftIconPress} style={styles.iconLeft}>
            <Ionicons name={leftIcon} size={20} color="#64748B" />
          </Pressable>
        )}

        <RNTextInput
          style={[
            styles.input,
            leftIcon && { paddingLeft: 36 },
            rightIcon && { paddingRight: 36 },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
        />

        {rightIcon && (
          <Pressable onPress={onRightIconPress} style={styles.iconRight}>
            <Ionicons name={rightIcon} size={20} color="#64748B" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  inputContainer: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "white",
    color: "black",
  },
  label: {
    color: "black",
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "500",
  },
  iconLeft: {
    position: "absolute",
    left: 12,
    zIndex: 2,
  },
  iconRight: {
    position: "absolute",
    right: 12,
    zIndex: 2,
  },
});

export default TextInput;