import { Link, Stack } from "expo-router";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Button, Card, Surface, Text } from "react-native-paper";

export default function NotFoundScreen() {
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 30,
    },
    card: {
      width: "50%",
      maxWidth: 500,
      minWidth: 250,
      alignItems: "center",
      padding: 10,
    },
    title: {
      marginTop: 20,
    },
    content: {
      marginVertical: 10,
    },
  });

  return (
    <>
      <Stack.Screen />
      <Surface style={styles.container} elevation={4}>
        <Card style={styles.card}>
          <Card.Title
            title={t("notFound.title")}
            titleStyle={styles.title}
            titleVariant="headlineMedium"
          />
          <Card.Content style={styles.content}>
            <Text variant="bodyMedium">{t("notFound.description")}</Text>
          </Card.Content>
          <Card.Actions>
            <Link href="/profile" asChild>
              <Button mode="contained">{t("notFound.button")}</Button>
            </Link>
          </Card.Actions>
        </Card>
      </Surface>
    </>
  );
}
