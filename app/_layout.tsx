import GlobalProvider from "@/context/GlobalProvider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const RootLayout = () => {

  const [fontsLoaded, error] = useFonts({
    "Nunito-Bold": require("@/assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Regular": require("@/assets/fonts/Nunito-Regular.ttf"),
  })

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;
