import { selectIsSignedIn } from "@/store/slices/authenticationSlice";
import { Redirect, Stack } from "expo-router";
import { useSelector } from "react-redux";

export default function AuthRoot() {
  const isSignedIn = useSelector(selectIsSignedIn);

  if (isSignedIn) {
    return <Redirect href="/profile"></Redirect>;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
