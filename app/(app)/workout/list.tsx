import AddExerciseModal from "@/components/exercise/add-exercise-modal";
import DeleteExerciseModal from "@/components/exercise/delete-exercise-modal";
import EditExerciseModal from "@/components/exercise/edit-exercise-modal";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, List, Portal, Surface, Text } from "react-native-paper";

import LinearProgressBar from "@/components/shared/progress-bar";
import { globalStyles } from "@/components/styles/global";
import DeleteWorkoutModal from "@/components/workout/delete-workout-modal";
import {
  CustomExerciseViewDto,
  useGetCustomExercisesQuery,
  useGetCustomWorkoutsQuery,
} from "@/store/slices/apiSlice";
import { useRouter } from "expo-router";

const CustomWorkoutListPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [isAddExerciseModalVisible, setIsAddExerciseModalVisible] =
    useState(false);

  const [deleteExerciseModalId, setDeleteExerciseModalId] = useState<
    null | string
  >(null);

  const [deleteWorkoutModalId, setDeleteWorkoutModalId] = useState<
    null | string
  >(null);

  const [editExerciseModalValue, setEditExerciseModalValue] =
    useState<null | CustomExerciseViewDto>(null);

  const customExercises = useGetCustomExercisesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    pollingInterval: 30000,
    skipPollingIfUnfocused: true,
  });

  const customWorkouts = useGetCustomWorkoutsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    pollingInterval: 30000,
    skipPollingIfUnfocused: true,
  });

  const styles = StyleSheet.create({
    section: {
      marginBottom: 10,
    },
  });

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Surface style={globalStyles.container} elevation={4}>
        <View style={styles.section}>
          <View style={globalStyles.header}>
            <Text variant="headlineLarge">{t("customExercise.title")}</Text>
            <IconButton
              icon="plus"
              onPress={() => setIsAddExerciseModalVisible(true)}
            ></IconButton>
          </View>

          {customExercises.isSuccess &&
          customExercises.currentData &&
          customExercises.currentData.success ? (
            customExercises.currentData.data!.map((value) => {
              return (
                <List.Item
                  key={value.id}
                  title={value.title}
                  description={value.description}
                  right={(props) => (
                    <>
                      <IconButton
                        {...props}
                        icon="pen"
                        onPress={() => setEditExerciseModalValue(value)}
                      />
                      <IconButton
                        {...props}
                        icon="delete"
                        onPress={() => setDeleteExerciseModalId(value.id)}
                      />
                    </>
                  )}
                />
              );
            })
          ) : (
            <LinearProgressBar />
          )}
        </View>
        <View style={styles.section}>
          <View style={globalStyles.header}>
            <Text variant="headlineLarge">{t("customWorkout.title")}</Text>
            <IconButton
              icon="plus"
              onPress={() => router.navigate("/workout/add")}
            />
          </View>

          {customWorkouts.isSuccess &&
          customWorkouts.currentData &&
          customWorkouts.currentData.success ? (
            customWorkouts.currentData.data!.map((value) => {
              return (
                <List.Item
                  key={value.id}
                  title={value.title}
                  description={value.description}
                  right={(props) => (
                    <>
                      <IconButton
                        {...props}
                        icon="pen"
                        onPress={() =>
                          router.navigate(`/workout/edit/${value.id}`)
                        }
                      />
                      <IconButton
                        {...props}
                        icon="delete"
                        onPress={() => setDeleteWorkoutModalId(value.id)}
                      />
                    </>
                  )}
                />
              );
            })
          ) : (
            <LinearProgressBar />
          )}
        </View>
      </Surface>
      <Portal>
        <AddExerciseModal
          visible={isAddExerciseModalVisible}
          hideModal={() => setIsAddExerciseModalVisible(false)}
          onSuccess={() => customExercises.refetch()}
        />
        <DeleteExerciseModal
          visible={deleteExerciseModalId !== null}
          hideModal={() => setDeleteExerciseModalId(null)}
          onSuccess={() => customExercises.refetch()}
          customExerciseId={deleteExerciseModalId}
        />
        <EditExerciseModal
          visible={editExerciseModalValue !== null}
          hideModal={() => setEditExerciseModalValue(null)}
          onSuccess={() => customExercises.refetch()}
          customExercise={editExerciseModalValue}
        />
        <DeleteWorkoutModal
          visible={deleteWorkoutModalId !== null}
          hideModal={() => setDeleteWorkoutModalId(null)}
          onSuccess={() => customWorkouts.refetch()}
          customWorkoutId={deleteWorkoutModalId}
        />
      </Portal>
    </ScrollView>
  );
};

export default CustomWorkoutListPage;
