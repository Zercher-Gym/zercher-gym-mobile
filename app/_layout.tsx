import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { PropsWithChildren, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SafeAreaView } from "@/components/ui/safe-area-view";

import { selectThemeMode } from "@/store/slices/themeSlice";
import { persistor, store } from "@/store/store";

import "@/global.css";
import "@/store/i18n";

SplashScreen.preventAutoHideAsync();

function ThemeProvider({ children }: Readonly<PropsWithChildren>) {
  const themeMode = useSelector(selectThemeMode);

  return <GluestackUIProvider mode={themeMode}>{children}</GluestackUIProvider>;
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
          <SafeAreaView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }} />
          </SafeAreaView>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
