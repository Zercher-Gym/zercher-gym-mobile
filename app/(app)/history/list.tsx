import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, List, Portal, Surface, Text } from "react-native-paper";

import DeleteLogModal from "@/components/log/delete-log-modal";
import LinearProgressBar from "@/components/shared/progress-bar";
import { globalStyles } from "@/components/styles/global";
import SearchWorkoutModal from "@/components/workout/search-workout-modal";
import {
  CustomWorkoutViewListDto,
  useLazyGetWorkoutLogListQuery,
  WorkoutViewListDto,
} from "@/store/slices/apiSlice";
import { formatDateTime } from "@/store/utils/utilities";
import { useRouter } from "expo-router";

const HistoryListPage = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const [page, setPage] = useState<number>(0);

  const [deleteWorkoutModalId, setDeleteWorkoutModalId] = useState<
    string | null
  >(null);

  const [isSearchWorkoutModalVisible, setIsSearchWorkoutModalVisible] =
    useState(false);

  const [getWorkoutLogList, workoutLogList] = useLazyGetWorkoutLogListQuery();

  const fetchData = async () => {
    if (page >= 0) {
      await getWorkoutLogList({ page: page, size: 20 });
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const styles = StyleSheet.create({
    section: {
      marginBottom: 10,
    },
  });

  const onSelectWorkout = (workout: WorkoutViewListDto) => {
    router.navigate(`/history/workout/add/${workout.id}`);
  };

  const selectCustomWorkout = (customWorkout: CustomWorkoutViewListDto) => {
    router.navigate(`/history/workout/custom/add/${customWorkout.id}`);
  };

  const nextPage = () => {
    if (
      (page + 2) * workoutLogList.currentData!.pageSize! <=
      workoutLogList.currentData!.totalElements!
    ) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    if (page >= 0) {
      setPage(page - 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Surface style={globalStyles.container} elevation={4}>
        <View style={styles.section}>
          <View style={globalStyles.header}>
            <Text variant="headlineLarge">{t("workoutLog.history")}</Text>
            <IconButton
              icon="plus"
              onPress={() => setIsSearchWorkoutModalVisible(true)}
            />
          </View>
          {workoutLogList.isSuccess &&
          workoutLogList.currentData &&
          workoutLogList.currentData.success ? (
            <>
              {workoutLogList.currentData.data!.map((value) => {
                if (value.title !== null) {
                  return (
                    <List.Item
                      key={value.id}
                      title={value.title}
                      description={formatDateTime(
                        i18n.language,
                        value.createdAt
                      )}
                      right={(props) => (
                        <>
                          <IconButton
                            icon="eye"
                            onPress={() =>
                              router.navigate(
                                `/history/workout/edit/${value.id}`
                              )
                            }
                          />
                          <IconButton
                            icon="delete"
                            onPress={() => setDeleteWorkoutModalId(value.id)}
                          />
                        </>
                      )}
                    />
                  );
                } else if (value.labels && value.labels[i18n.language]) {
                  return (
                    <List.Item
                      key={value.id}
                      title={value.labels[i18n.language].title}
                      description={formatDateTime(
                        i18n.language,
                        value.createdAt
                      )}
                      right={(props) => (
                        <>
                          <IconButton
                            icon="eye"
                            onPress={() =>
                              router.navigate(
                                `/history/workout/edit/${value.id}`
                              )
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
                }
              })}
              <View style={globalStyles.header}>
                <IconButton icon="arrow-left" onPress={previousPage} />
                <IconButton icon="arrow-right" onPress={nextPage} />
              </View>
            </>
          ) : (
            <LinearProgressBar />
          )}
        </View>
      </Surface>
      <Portal>
        <SearchWorkoutModal
          onSelectWorkout={onSelectWorkout}
          onSelectCustomWorkout={selectCustomWorkout}
          visible={isSearchWorkoutModalVisible}
          hideModal={() => setIsSearchWorkoutModalVisible(false)}
        />
        <DeleteLogModal
          visible={deleteWorkoutModalId !== null}
          hideModal={() => setDeleteWorkoutModalId(null)}
          onSuccess={() => fetchData()}
          workoutLogId={deleteWorkoutModalId}
        />
      </Portal>
    </ScrollView>
  );
};

export default HistoryListPage;
