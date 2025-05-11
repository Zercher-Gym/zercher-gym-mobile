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

import {
  UserEmailDto,
  useResetPasswordSendMutation,
} from "@/store/slices/apiSlice";
import { emailRegex } from "@/store/utils/utilities";

export default function PasswordResetScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();

  const [resetSent, setResetSent] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | undefined>(undefined);

  const [resetPasswordSend, requestInformation] =
    useResetPasswordSendMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserEmailDto>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<UserEmailDto> = async (data: UserEmailDto) => {
    try {
      await resetPasswordSend({
        userEmailDto: data,
      }).unwrap();
      setInfoMessage(
        t("resetPassword.sucessMessage", { ns: "authentication" })
      );
      setResetSent(true);
      setTimeout(() => {
        setResetSent(false);
      }, 10000);
    } catch (err) {
      const error = err as any;

      console.log(error);
      let errorMessage = "unknownError";
      if (error.data !== undefined && error.data !== null) {
        errorMessage = error.data.error;
      }
      setInfoMessage(t(errorMessage, { ns: "error" }));
    }
  };

  const dismissInfo = () => {
    requestInformation.reset();
    setInfoMessage(undefined);
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
    signUpButton: {
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
              title={t("resetPassword.title", { ns: "authentication" })}
              titleVariant="headlineSmall"
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
                    disabled={resetSent}
                    label={t("email.title", { ns: "authentication" })}
                    mode="outlined"
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.email}
                    style={styles.input}
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.error}>{errors.email.message}</Text>
              )}
            </Card.Content>
            <Card.Actions>
              <Button
                disabled={resetSent}
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                loading={isSubmitting}
              >
                {t("resetPassword.title", { ns: "authentication" })}
              </Button>
            </Card.Actions>
          </Card>
          <Button style={styles.signUpButton} onPress={goToSignInPage}>
            {t("resetPassword.returnToSignIn", { ns: "authentication" })}
          </Button>
        </View>
      </Surface>
      <Snackbar
        visible={requestInformation.isSuccess || requestInformation.isError}
        onDismiss={dismissInfo}
        action={{
          label: t("application.close"),
          onPress: dismissInfo,
        }}
      >
        {infoMessage}
      </Snackbar>
    </>
  );
}
