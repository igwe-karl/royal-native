import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import Toast from "react-native-toast-message";

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from './auth/authContext';
import { useFonts } from "expo-font";
import { ActivityIndicator, View, Text } from 'react-native';
import { Fonts } from '@/constants/theme';
import AuthGuard from './auth/authGuard';


(Text as any).defaultProps = (Text as any).defaultProps || {};
(Text as any).defaultProps.style = { fontFamily: Fonts.regular };

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    "PlusJakarta-Regular": require("../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Regular.ttf"),
    "PlusJakarta-Medium": require("../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Medium.ttf"),
    "PlusJakarta-SemiBold": require("../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-SemiBold.ttf"),
    "PlusJakarta-Bold": require("../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Bold.ttf"),
    "PlusJakarta-ExtraBold": require("../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-ExtraBold.ttf"),
  });

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <AuthGuard>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="auto" />
          <Toast />
        </AuthProvider>
      </ThemeProvider>
    </AuthGuard>
  );
}
