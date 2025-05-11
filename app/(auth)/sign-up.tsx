import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
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

import {
  useConfirmEmailSendMutation,
  useCreateUserMutation,
  UserSignUpDto,
} from "@/store/slices/apiSlice";
import { emailRegex, strongPasswordRegex } from "@/store/utils/utilities";

export default function SignUpScreen() {
  const countdownSeconds = 10;

  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const [countdownStarted, setCountdownStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(countdownSeconds);
  const [eventDate, setEventDate] = useState(0);

  const [createUser, createUserRequestInformation] = useCreateUserMutation();
  const [confirmEmailSend] = useConfirmEmailSendMutation();

  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserSignUpDto>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (countdownStarted && eventDate) {
      const countdownInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const requestTime = eventDate + countdownSeconds * 1000;

        let remainingTime = requestTime - currentTime;
        if (remainingTime <= 0) {
          remainingTime = 0;
          clearInterval(countdownInterval);
        }

        setTimeRemaining(Math.floor(remainingTime / 1000));
      }, 1000);
      return () => clearInterval(countdownInterval);
    }
  }, [countdownStarted, timeRemaining, eventDate]);

  const onSubmit: SubmitHandler<UserSignUpDto> = async (
    data: UserSignUpDto
  ) => {
    try {
      setCountdownStarted(true);
      setEventDate(new Date().getTime());

      const response = await createUser({
        userSignUpDto: data,
      }).unwrap();

      if (response.success) {
        setSuccess(true);
      } else {
        throw Error(response.error);
      }
    } catch (err) {
      const error = err as any;

      let errorMessage = "unknownError";
      if (error.data !== undefined && error.data !== null) {
        errorMessage = error.data.error;
      }
      setErrorMessage(t(errorMessage, { ns: "error" }));
    }
  };

  const resendConfirmationEmail = async () => {
    try {
      setCountdownStarted(true);
      setEventDate(new Date().getTime());

      await confirmEmailSend({
        userEmailDto: {
          email: getValues("email"),
        },
      });
    } catch (err) {
      const error = err as any;
      setErrorMessage(t(error.date.error, { ns: "error" }));
    }
  };

  const dismissError = () => {
    createUserRequestInformation.reset();
    setErrorMessage(undefined);
  };

  const goToSignInPage = () => {
    router.navigate("/sign-in");
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
          {!success ? (
            <>
              <Card style={styles.card}>
                <Card.Title
                  title={t("signup.title", { ns: "authentication" })}
                  titleVariant="headlineMedium"
                />
                <Card.Content>
                  <Controller
                    control={control}
                    name="email"
                    rules={{
                      required: t("email.requiredError", {
                        ns: "authentication",
                      }),
                      pattern: {
                        value: emailRegex,
                        message: t("email.invalidError", {
                          ns: "authentication",
                        }),
                      },
                    }}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        label={t("email.title", { ns: "authentication" })}
                        inputMode="email"
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
                  {errors.email && (
                    <Text style={styles.error}>{errors.email.message}</Text>
                  )}

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
                      pattern: {
                        value: strongPasswordRegex,
                        message: t("password.strongPasswordError", {
                          ns: "authentication",
                        }),
                      },
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
                    {t("signup.title", { ns: "authentication" })}
                  </Button>
                </Card.Actions>
              </Card>
              <Button style={styles.button} onPress={goToSignInPage}>
                {t("signup.signInText", { ns: "authentication" })}
              </Button>
            </>
          ) : (
            <>
              <Card style={styles.card}>
                <Card.Title
                  title={t("signup.success.title", { ns: "authentication" })}
                  style={{}}
                  titleVariant="titleMedium"
                />
                <Card.Content>
                  <Text>
                    {t("signup.success.message", { ns: "authentication" })}
                  </Text>
                </Card.Content>
                <Card.Actions>
                  <Button onPress={goToSignInPage} mode="contained-tonal">
                    {t("signin.title", { ns: "authentication" })}
                  </Button>
                </Card.Actions>
              </Card>
              {countdownStarted && (
                <Button
                  mode="elevated"
                  disabled={timeRemaining !== 0}
                  style={styles.button}
                  onPress={resendConfirmationEmail}
                >
                  {timeRemaining !== 0 ? (
                    <Trans
                      defaults={t("signup.resendConfirmationSeconds", {
                        ns: "authentication",
                      })}
                      values={{ seconds: timeRemaining }}
                    />
                  ) : (
                    t("signup.resendConfirmation", { ns: "authentication" })
                  )}
                </Button>
              )}
            </>
          )}
        </View>
      </Surface>
      <Snackbar
        visible={errorMessage !== undefined}
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
