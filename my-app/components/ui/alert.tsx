import React from "react";
import { StyleSheet, Button, Alert } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

// Type for dynamic button options
type AlertButton = {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
};

type DynamicAlertProps = {
  title: string;
  message: string;
  buttons: AlertButton[];
};

const showAlert = ({ title, message, buttons }: DynamicAlertProps) => {
  Alert.alert(title, message, buttons);
};

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Button
          title="2-Button Alert"
          onPress={() =>
            showAlert({
              title: "2-Button Alert",
              message: "This is a dynamic 2-button alert",
              buttons: [
                {
                  text: "Cancel",
                  style: "cancel",
                  onPress: () => console.log("Cancel Pressed"),
                },
                {
                  text: "OK",
                  onPress: () => console.log("OK Pressed"),
                },
              ],
            })
          }
        />
        <Button
          title="3-Button Alert"
          onPress={() =>
            showAlert({
              title: "3-Button Alert",
              message: "This is a dynamic 3-button alert",
              buttons: [
                {
                  text: "Ask me later",
                  onPress: () => console.log("Ask me later pressed"),
                },
                {
                  text: "Cancel",
                  style: "cancel",
                  onPress: () => console.log("Cancel Pressed"),
                },
                {
                  text: "OK",
                  onPress: () => console.log("OK Pressed"),
                },
              ],
            })
          }
        />
        <Button
          title="1-Button Alert"
          onPress={() =>
            showAlert({
              title: "1-Button Alert",
              message: "Single button alert",
              buttons: [
                {
                  text: "Got it",
                  onPress: () => console.log("Got it Pressed"),
                },
              ],
            })
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default App;