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

import { useCreateUserMutation, UserSignUpDto } from "@/store/slices/apiSlice";
import { emailRegex, strongPasswordRegex } from "@/store/utils/utilities";

export default function SignUpScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const [createUser, requestInformation] = useCreateUserMutation();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserSignUpDto>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<UserSignUpDto> = async (
    data: UserSignUpDto
  ) => {
    try {
      const response = await createUser({
        userSignUpDto: data,
      }).unwrap();
      console.log(response);
      if (response.success) {
        console.log("Success!");
      } else {
        throw Error(response.error);
      }
    } catch (err) {
      const error = err as any;
      setErrorMessage(t(error.data.error, { ns: "error" }));
    } finally {
      reset();
    }
  };

  const dismissError = () => {
    requestInformation.reset();
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
      width: "50%",
      minWidth: 300,
      maxWidth: 500,
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
    signInButton: {
      marginTop: 10,
      width: "100%",
    },
  });

  return (
    <>
      <Surface style={styles.container} elevation={4}>
        <View style={styles.wrapper}>
          {success ? (
            <>
              <Card style={styles.card}>
                <Card.Title
                  title={t("signup.title", { ns: "authentication" })}
                  titleVariant="displayMedium"
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
              <Button style={styles.signInButton} onPress={goToSignInPage}>
                {t("signup.signInText", { ns: "authentication" })}
              </Button>
            </>
          ) : (
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
                <Button
                  style={styles.signInButton}
                  onPress={goToSignInPage}
                  mode="contained-tonal"
                >
                  {t("signin.title", { ns: "authentication" })}
                </Button>
              </Card.Actions>
            </Card>
          )}
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
