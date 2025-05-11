import { selectIsSignedIn } from "@/store/slices/authenticationSlice";
import { Href, Redirect, Stack, useRouter } from "expo-router";
import { Appbar, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

type TabConfig = {
  name: string;
  title: string;
  icon: string;
};

export default function AppLayout() {
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();
  const theme = useTheme();

  const tabs: TabConfig[] = [
    { name: "profile", title: "Profile", icon: "account" },
  ];

  const isSignedIn = useSelector(selectIsSignedIn);

  if (!isSignedIn) {
    return <Redirect href="/sign-in"></Redirect>;
  }

  const redirectToPage = (page: Href) => {
    router.navigate(page);
  };

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Appbar
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: theme.colors.elevation.level2,
        }}
        safeAreaInsets={{ bottom }}
      >
        <Appbar.Action
          icon="dumbbell"
          size={30}
          onPress={() => redirectToPage("/profile")}
        />
        <Appbar.Action
          icon="account"
          size={30}
          onPress={() => redirectToPage("/profile")}
        />
      </Appbar>
    </>
  );
}
