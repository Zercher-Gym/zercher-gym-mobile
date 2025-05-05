import { useGetProfileCurrentQuery } from "@/store/slices/apiSlice";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import {
    Card,
    List,
    ProgressBar,
    SegmentedButtons,
    Surface,
    Switch,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { supportedLanguages } from "@/store/i18n";
import { selectThemeMode, toggleThemeMode } from "@/store/slices/themeSlice";
import { formatDate } from "@/store/utils/utilities";

export default function Profile() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const themeMode = useSelector(selectThemeMode);

  const { currentData, isSuccess } = useGetProfileCurrentQuery(undefined, {
    refetchOnMountOrArgChange: 3000,
  });

  const onToggleTheme = () => {
    dispatch(toggleThemeMode());
  };

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
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
      marginTop: 50,
      paddingHorizontal: 10,
      width: "60%",
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
                left={(props) => <List.Icon {...props} icon="human" />}
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
                right={(props) => (
                  <SegmentedButtons
                    value={i18n.language}
                    onValueChange={handleChangeLanguage}
                    buttons={supportedLanguages.map((language) => ({
                      value: language,
                      label: language.toUpperCase(),
                    }))}
                  />
                )}
              />
            </List.Section>
            <List.Section>
              <List.Subheader>
                {t("profile.actions", { ns: "authentication" })}
              </List.Subheader>
            </List.Section>
          </Card.Content>
        ) : (
          <ProgressBar indeterminate={true} style={styles.loadingBar} />
        )}
      </Card>
    </Surface>
  );
}
