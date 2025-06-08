import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Keyboard, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useDispatch } from "react-redux";

import DismissKeyboard from "@/components/shared/dismiss-keyboard";
import {
  useGetProfileCurrentQuery,
  UserUpdateDto,
  useUpdateProfileMutation,
} from "@/store/slices/apiSlice";
import { setMessage } from "@/store/slices/messageSlice";
import { emailRegex } from "@/store/utils/utilities";

export default function ProfileEditPage() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [updateProfile] = useUpdateProfileMutation();

  const { currentData, isSuccess } = useGetProfileCurrentQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserUpdateDto>({
    defaultValues: {
      email: "",
      username: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      reset({
        email: currentData?.data?.email,
        username: currentData?.data?.username,
      });
    }
  }, [isSuccess]);

  const onSubmit: SubmitHandler<UserUpdateDto> = async (
    data: UserUpdateDto
  ) => {
    try {
      await updateProfile({
        userUpdateDto: data,
      }).unwrap();

      router.replace("/profile");
    } catch (err) {
      const error = err as any;
      dispatch(setMessage({ data: error, type: "payload" }));
    } finally {
      Keyboard.dismiss();
    }
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
    <Surface style={styles.container} elevation={4}>
      <DismissKeyboard>
        <View style={styles.wrapper}>
          <Card style={styles.card}>
            <Card.Title
              title={t("editProfile.title", { ns: "authentication" })}
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
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                loading={isSubmitting}
              >
                {t("application.edit")}
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </DismissKeyboard>
    </Surface>
  );
}
