import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    base: {
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
  
    /* Variants */
    primary: {
      backgroundColor: "#7F1945",
    },
    secondary: {
      backgroundColor: "#2C599D",
    },
    outline: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: "#ED6C00",
    },
    ghost: {
      backgroundColor: "transparent",
    },
  
    /* Sizes */
    sm: {
      paddingVertical: 8,
      paddingHorizontal: 14,
    },
    md: {
      paddingVertical: 12,
      paddingHorizontal: 20,
    },
    lg: {
      paddingVertical: 16,
      paddingHorizontal: 28,
    },
  
    /* Text */
    textBase: {
      fontWeight: "600",
    },
  
    text_primary: { color: "#FFFFFF" },
    text_secondary: { color: "#FFFFFF" },
    text_outline: { color: "#ED6C00" },
    text_ghost: { color: "#ED6C00" },
  
    text_sm: { fontSize: 14 },
    text_md: { fontSize: 16 },
    text_lg: { fontSize: 18 },
  
    /* States */
    disabled: {
      opacity: 0.5,
    },
    pressed: {
      opacity: 0.8,
    },
  });