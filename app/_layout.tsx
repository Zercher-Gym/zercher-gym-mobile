import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { PropsWithChildren, useEffect } from "react";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "@/store/i18n";
import { selectThemeMode } from "@/store/slices/themeSlice";
import { persistor, store } from "@/store/store";

import MessageSnackbar from "@/components/shared/message-snackbar";
import StackHeader from "@/components/shared/stack-header";

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
          <Stack
            screenOptions={{
              header: (props) => (
                <StackHeader navProps={props}>
                  <></>
                </StackHeader>
              ),
            }}
          >
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
          </Stack>
          <MessageSnackbar />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
