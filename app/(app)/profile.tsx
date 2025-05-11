import {
  useDeleteProfileCurrentMutation,
  useGetProfileCurrentQuery,
  useResetPasswordSendMutation,
} from "@/store/slices/apiSlice";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import {
  Button,
  Card,
  Dialog,
  IconButton,
  List,
  Portal,
  ProgressBar,
  Snackbar,
  Surface,
  Switch,
  Text,
  useTheme,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import LanguageSelector from "@/components/shared/language-selector";
import { removeToken } from "@/store/slices/authenticationSlice";
import { selectThemeMode, toggleThemeMode } from "@/store/slices/themeSlice";
import { formatDate } from "@/store/utils/utilities";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Profile() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();

  const theme = useTheme();
  const themeMode = useSelector(selectThemeMode);

  const [infoMessage, setInfoMessage] = useState<string | undefined>();

  const { currentData, isSuccess } = useGetProfileCurrentQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const [resetSent, setResetSent] = useState(false);
  const [resetPasswordSend, resetPasswordSendInformation] =
    useResetPasswordSendMutation();

  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [deleteProfileCurrent] = useDeleteProfileCurrentMutation();

  const onToggleTheme = () => {
    dispatch(toggleThemeMode());
  };

  const signOut = () => {
    dispatch(removeToken());
    router.navigate("/sign-in");
  };

  const sendResetPassword = async () => {
    try {
      await resetPasswordSend({
        userEmailDto: {
          email: currentData?.data?.email!,
        },
      }).unwrap();
      setInfoMessage(
        t("resetPassword.sucessMessage", { ns: "authentication" })
      );
      setResetSent(true);
      setTimeout(() => {
        setResetSent(false);
      }, 30000);
    } catch (err) {
      const error = err as any;

      let errorMessage = "unknownError";
      if (error.data !== undefined && error.data !== null) {
        errorMessage = error.data.error;
      }
      setInfoMessage(t(errorMessage, { ns: "error" }));
    }
  };

  const dismissInfo = () => {
    resetPasswordSendInformation.reset();
    setInfoMessage(undefined);
  };

  const showDeleteConfirmationModal = () => {
    setDeleteConfirmationVisible(true);
  };

  const dismissDeleteConfirmationModal = () => {
    setDeleteConfirmationVisible(false);
  };

  const deleteProfile = async () => {
    try {
      await deleteProfileCurrent().unwrap();
      setInfoMessage(
        t("resetPassword.successMessage", { ns: "authentication" })
      );
      setTimeout(() => {
        dispatch(removeToken());
        router.navigate("/sign-in");
      }, 5000);
    } catch (err) {
      const error = err as any;

      let errorMessage = "unknownError";
      if (error.data !== undefined && error.data !== null) {
        errorMessage = error.data.error;
      }
      setInfoMessage(t(errorMessage, { ns: "error" }));
    }
  };

  const goToProfileEdit = () => {
    router.navigate("/profile-edit");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      marginTop: 20,
    },
    card: {
      marginVertical: 20,
      paddingHorizontal: 10,
      width: "100%",
      minWidth: 300,
      maxWidth: 600,
      alignSelf: "center",
    },
    loadingBar: {
      marginVertical: 30,
      marginHorizontal: 20,
    },
  });

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Surface style={styles.container} elevation={4}>
        <Card style={styles.card}>
          <Card.Title
            title={t("profile.title", { ns: "authentication" })}
            titleStyle={styles.title}
            titleVariant="displayMedium"
          />
          {isSuccess && currentData !== undefined ? (
            <Card.Content>
              <List.Section>
                <List.Subheader>
                  {t("profile.userData", { ns: "authentication" })}
                </List.Subheader>
                <List.Item
                  title={t("username.title", { ns: "authentication" })}
                  description={currentData.data?.username}
                  left={(props) => <List.Icon {...props} icon="account" />}
                />
                <List.Item
                  title={t("email.title", { ns: "authentication" })}
                  description={currentData.data?.email}
                  left={(props) => <List.Icon {...props} icon="email" />}
                />
                <List.Item
                  title={t("profile.memberSince", { ns: "authentication" })}
                  description={formatDate(
                    i18n.language,
                    currentData.data?.createdAt
                  )}
                  left={(props) => <List.Icon {...props} icon="calendar" />}
                />
              </List.Section>
              <List.Section>
                <List.Subheader>
                  {t("profile.settings", { ns: "authentication" })}
                </List.Subheader>
                <List.Item
                  title={t("theme.title")}
                  description={t(`theme.${themeMode}`)}
                  right={(props) => (
                    <Switch
                      {...props}
                      value={themeMode === "light"}
                      onValueChange={onToggleTheme}
                    />
                  )}
                />
                <List.Item
                  title={""}
                  left={(props) => <List.Icon {...props} icon="translate" />}
                  right={(props) => <LanguageSelector />}
                />
              </List.Section>
              <List.Section>
                <List.Subheader>
                  {t("profile.actions", { ns: "authentication" })}
                </List.Subheader>
                <List.Item
                  title={t("signout", { ns: "authentication" })}
                  right={(props) => (
                    <IconButton {...props} icon="logout" onPress={signOut} />
                  )}
                />
                <List.Item
                  title={t("resetPassword.title", { ns: "authentication" })}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="lock-reset"
                      onPress={sendResetPassword}
                      disabled={resetSent}
                    />
                  )}
                />
                <List.Item
                  title={t("editProfile.title", { ns: "authentication" })}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="pencil"
                      onPress={goToProfileEdit}
                    />
                  )}
                />
                <List.Item
                  title={t("deleteProfile.title", { ns: "authentication" })}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="account-off"
                      onPress={showDeleteConfirmationModal}
                    />
                  )}
                />
              </List.Section>
            </Card.Content>
          ) : (
            <ProgressBar indeterminate={true} style={styles.loadingBar} />
          )}
        </Card>
      </Surface>
      <Portal>
        <Dialog
          visible={deleteConfirmationVisible}
          onDismiss={dismissDeleteConfirmationModal}
        >
          <Dialog.Title>
            {t("deleteProfile.title", { ns: "authentication" })}
          </Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              {t("deleteProfile.confirmationMessage", { ns: "authentication" })}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="contained" onPress={dismissDeleteConfirmationModal}>
              {t("application.close")}
            </Button>
            <Button mode="outlined" onPress={deleteProfile}>
              {t("application.delete")}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Snackbar
        visible={
          resetPasswordSendInformation.isSuccess ||
          resetPasswordSendInformation.isError
        }
        onDismiss={dismissInfo}
        action={{
          label: t("application.close"),
          onPress: dismissInfo,
        }}
      >
        {infoMessage}
      </Snackbar>
    </ScrollView>
  );
}
