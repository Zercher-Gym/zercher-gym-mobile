import { Redirect, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import StackHeader from "@/components/shared/stack-header";
import { selectIsSignedIn } from "@/store/slices/authenticationSlice";

export default function AuthRoot() {
  const isSignedIn = useSelector(selectIsSignedIn);
  const { t } = useTranslation();

  if (isSignedIn) {
    return <Redirect href="/profile"></Redirect>;
  }

  return (
    <Stack
      screenOptions={{
        header: (props) => (
          <StackHeader navProps={props} showLanguageSelector={true}>
            <></>
          </StackHeader>
        ),
      }}
    >
      <Stack.Screen
        name="sign-in"
        options={{ title: t("application.title") }}
      />
      <Stack.Screen
        name="sign-up"
        options={{ title: t("application.title") }}
      />
      <Stack.Screen
        name="password-reset"
        options={{ title: t("application.title") }}
      />
    </Stack>
  );
}
