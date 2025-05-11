import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Snackbar,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useDispatch } from "react-redux";

import {
  useAuthenticateUserMutation,
  UserSignInDto,
} from "@/store/slices/apiSlice";
import { setToken } from "@/store/slices/authenticationSlice";

export default function SignInScreen() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const router = useRouter();
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
      if (response.data) dispatch(setToken(response.data.toString()));
      else throw Error(response.error);
      router.navigate("/profile");
    } catch (err) {
      const error = err as any;

      let errorMessage = "unknownError";
      if (error.data !== undefined && error.data !== null) {
        errorMessage = error.data.error;
      }
      setErrorMessage(t(errorMessage, { ns: "error" }));
    } finally {
      reset();
    }
  };

  const dismissError = () => {
    requestInformation.reset();
    setErrorMessage(undefined);
  };

  const goToSignUpPage = () => {
    router.navigate("/sign-up");
  };

  const goToResetPasswordPage = () => {
    router.navigate("/password-reset");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
    },
    wrapper: {
      width: "100%",
      minWidth: 300,
      maxWidth: 600,
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      padding: 20,
      width: "100%",
    },
    input: {
      marginVertical: 10,
    },
    error: {
      marginBottom: 10,
      marginLeft: 5,
      color: theme.colors.error,
    },
    button: {
      marginTop: 10,
      width: "100%",
    },
  });

  return (
    <>
      <Surface style={styles.container} elevation={4}>
        <View style={styles.wrapper}>
          <Card style={styles.card}>
            <Card.Title
              title={t("signin.title", { ns: "authentication" })}
              titleVariant="headlineMedium"
            />
            <Card.Content>
              <Controller
                control={control}
                name="username"
                rules={{
                  required: t("username.requiredError", {
                    ns: "authentication",
                  }),
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
                  required: t("password.requiredError", {
                    ns: "authentication",
                  }),
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
          <Button style={styles.button} onPress={goToSignUpPage}>
            {t("signin.signUpText", { ns: "authentication" })}
          </Button>
          <Button style={styles.button} onPress={goToResetPasswordPage}>
            {t("signin.forgotPasswordText", { ns: "authentication" })}
          </Button>
        </View>
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
