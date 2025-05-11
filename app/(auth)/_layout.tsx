import LanguageSelector from "@/components/shared/language-selector";
import { selectIsSignedIn } from "@/store/slices/authenticationSlice";
import { Redirect, Stack, useRouter } from "expo-router";
import { Appbar } from "react-native-paper";
import { useSelector } from "react-redux";

export default function AuthRoot() {
  const isSignedIn = useSelector(selectIsSignedIn);
  const router = useRouter();

  if (isSignedIn) {
    return <Redirect href="/profile"></Redirect>;
  }

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <>
      <Appbar elevated={true}>
        <Appbar.BackAction onPress={goBack} style={{ marginRight: "auto" }} />
        <LanguageSelector />
      </Appbar>
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
