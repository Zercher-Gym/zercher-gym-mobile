import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { PropsWithChildren, useEffect } from "react";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { selectThemeMode } from "@/store/slices/themeSlice";
import { persistor, store } from "@/store/store";

import "@/store/i18n";

SplashScreen.preventAutoHideAsync();

function ThemeProvider({ children }: Readonly<PropsWithChildren>) {
  const themeMode = useSelector(selectThemeMode);

  return (
    <PaperProvider theme={themeMode === "light" ? MD3LightTheme : MD3DarkTheme}>
      {children}
    </PaperProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
