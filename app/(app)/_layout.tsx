import { selectIsSignedIn } from "@/store/slices/authenticationSlice";
import { Redirect, Stack } from "expo-router";
import { useSelector } from "react-redux";

export default function AppLayout() {
  const isSignedIn = useSelector(selectIsSignedIn);

  if (!isSignedIn) {
    return <Redirect href="/sign-in"></Redirect>;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
