import AddExerciseModal from "@/components/custom/add-exercise-modal";
import DeleteExerciseModal from "@/components/custom/delete-exercise-modal";
import EditExerciseModal from "@/components/custom/edit-exercise-modal";
import {
    CustomExerciseViewDto,
    useGetCustomExercisesQuery,
    useGetCustomWorkoutsQuery,
} from "@/store/slices/apiSlice";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import {
    IconButton,
    List,
    Portal,
    ProgressBar,
    Surface,
    Text,
} from "react-native-paper";

const CustomPage = () => {
  const { t } = useTranslation();

  const [isAddExerciseModalVisible, setIsAddExerciseModalVisible] =
    useState(false);

  const [deleteExerciseModalId, setDeleteExerciseModalId] = useState<
    null | string
  >(null);

  const [editExerciseModalValue, setEditExerciseModalValue] =
    useState<null | CustomExerciseViewDto>(null);

  const customExercises = useGetCustomExercisesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const customWorkouts = useGetCustomWorkoutsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
    },
    section: {
      marginBottom: 10,
    },
    loadingBar: {
      marginVertical: 30,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Surface style={styles.container} elevation={4}>
        <View style={styles.section}>
          <View style={styles.header}>
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
            <ProgressBar indeterminate={true} style={styles.loadingBar} />
          )}
        </View>
        <View style={styles.section}>
          <View style={styles.header}>
            <Text variant="headlineLarge">{t("customWorkout.title")}</Text>
            <IconButton icon="plus"></IconButton>
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
                      <List.Icon {...props} icon="pen" />
                      <List.Icon {...props} icon="delete" />
                    </>
                  )}
                />
              );
            })
          ) : (
            <ProgressBar indeterminate={true} style={styles.loadingBar} />
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
      </Portal>
    </ScrollView>
  );
};

export default CustomPage;
