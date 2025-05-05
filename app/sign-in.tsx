import { Redirect, useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import {
    Button,
    Card,
    Snackbar,
    Surface,
    Text,
    TextInput,
    useTheme,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import {
    useAuthenticateUserMutation,
    UserSignInDto,
} from "@/store/slices/apiSlice";
import { selectIsSignedIn, setToken } from "@/store/slices/authenticationSlice";

export default function SignInScreen() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const router = useRouter();
  const isSignedIn = useSelector(selectIsSignedIn);
  const { t } = useTranslation();

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const [authenticateUser, requestInformation] = useAuthenticateUserMutation();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserSignInDto>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<UserSignInDto> = async (
    data: UserSignInDto
  ) => {
    try {
      const response = await authenticateUser({
        userSignInDto: data,
      }).unwrap();
      console.log(response);
      if (response.data) dispatch(setToken(response.data.toString()));
      else throw Error();
      router.navigate("/(app)/profile");
    } catch (err) {
      const error = err as any;
      let errorMessage = t("signin.unknownError", { ns: "authentication" });
      if (error.status === 400)
        errorMessage = t("signin.badCredentialsError", {
          ns: "authentication",
        });
      setErrorMessage(errorMessage);
    } finally {
      reset();
    }
  };

  const dismissError = () => {
    requestInformation.reset();
    setErrorMessage(undefined);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 10,
    },
    card: {
      padding: 20,
      width: "50%",
      minWidth: 300,
      maxWidth: 500,
      alignSelf: "center",
    },
    input: {
      marginVertical: 10,
    },
    error: {
      marginBottom: 10,
      marginLeft: 5,
      color: theme.colors.error,
    },
  });

  if (isSignedIn) {
    return <Redirect href="/profile" />;
  }

  return (
    <>
      <Surface style={styles.container} elevation={4}>
        <Card style={styles.card}>
          <Card.Title
            title={t("signin.title", { ns: "authentication" })}
            titleVariant="displayMedium"
          />
          <Card.Content>
            <Controller
              control={control}
              name="username"
              rules={{
                required: t("username.requiredError", { ns: "authentication" }),
              }}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  label={t("username.title", { ns: "authentication" })}
                  mode="outlined"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.username}
                  style={styles.input}
                />
              )}
            />
            {errors.username && (
              <Text style={styles.error}>{errors.username.message}</Text>
            )}

            <Controller
              control={control}
              name="password"
              rules={{
                required: t("password.requiredError", { ns: "authentication" }),
              }}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  label={t("password.title", { ns: "authentication" })}
                  mode="outlined"
                  secureTextEntry
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.password}
                  style={styles.input}
                />
              )}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
            >
              {t("signin.title", { ns: "authentication" })}
            </Button>
          </Card.Actions>
        </Card>
      </Surface>
      <Snackbar
        visible={requestInformation.error !== undefined}
        onDismiss={dismissError}
        action={{
          label: t("application.close"),
          onPress: dismissError,
        }}
      >
        {errorMessage}
      </Snackbar>
    </>
  );
}
