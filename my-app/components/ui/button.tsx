import React, { ReactNode } from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import { styles } from "@/constants/styles";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
};

export function Button({
  children,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
}: ButtonProps) {
  const containerStyles: ViewStyle[] = [
    styles.base, 
    styles[variant],
    styles[size],
    disabled ? styles.disabled : {},
  ];

  const textStyles: TextStyle[] = [
    styles.textBase, 
    styles[`text_${variant}`],
    styles[`text_${size}`],
  ];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        containerStyles,
        pressed && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={textStyles}>{children}</Text>
      )}
    </Pressable>
  );
}