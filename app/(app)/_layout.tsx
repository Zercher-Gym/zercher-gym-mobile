import { Href, Redirect, Stack, usePathname, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Appbar, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import StackHeader from "@/components/shared/stack-header";
import { selectIsSignedIn } from "@/store/slices/authenticationSlice";

export default function AppLayout() {
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();

  const isSignedIn = useSelector(selectIsSignedIn);

  if (!isSignedIn) {
    return <Redirect href="/sign-in"></Redirect>;
  }

  const redirectToPage = (page: Href) => {
    if (pathname !== page) {
      router.replace(page);
    }
  };

  return (
    <>
      <Stack
        screenOptions={{
          header: (props) => (
            <StackHeader navProps={props} showBack={true}>
              <></>
            </StackHeader>
          ),
        }}
      >
        <Stack.Screen
          name="workout/list"
          options={{ title: t("application.title") }}
        />
        <Stack.Screen
          name="workout/add"
          options={{ title: t("application.workout") }}
        />
        <Stack.Screen
          name="workout/edit/[id]"
          options={{ title: t("application.workout") }}
        />
        <Stack.Screen
          name="profile/view"
          options={{ title: t("application.title") }}
        />
        <Stack.Screen
          name="profile/edit"
          options={{ title: t("application.title") }}
        />
        <Stack.Screen
          name="history/list"
          options={{ title: t("application.title") }}
        />
        <Stack.Screen
          name="history/workout/add/[id]"
          options={{ title: t("application.title") }}
        />
        <Stack.Screen
          name="history/workout/edit/[id]"
          options={{ title: t("application.title") }}
        />
        <Stack.Screen
          name="history/workout/custom/add/[id]"
          options={{ title: t("application.title") }}
        />
      </Stack>
      <Appbar
        style={{
          height: 80,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          backgroundColor: theme.colors.elevation.level2,
        }}
        safeAreaInsets={{ bottom }}
      >
        <Appbar.Action
          icon="dumbbell"
          size={36}
          onPress={() => redirectToPage("/workout/list")}
        />
        <Appbar.Action
          icon="calendar"
          size={36}
          onPress={() => redirectToPage("/history/list")}
        />
        <Appbar.Action
          icon="account"
          size={36}
          onPress={() => redirectToPage("/profile/view")}
        />
      </Appbar>
    </>
  );
}
