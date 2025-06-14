import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import {
  IconButton,
  List,
  Modal,
  Searchbar,
  Surface,
  Text,
} from "react-native-paper";

import {
  CustomWorkoutViewListDto,
  useGetCustomWorkoutsQuery,
  useLazySearchWorkoutQuery,
  WorkoutViewListDto,
} from "@/store/slices/apiSlice";
import useDebounce from "../hooks/debounce";
import DismissKeyboard from "../shared/dismiss-keyboard";
import LinearProgressBar from "../shared/progress-bar";
import { modalStyles } from "../styles/modal";
import { IModalProps } from "../types/modal-props";

interface ISearchWorkoutModalProps extends IModalProps {
  onSelectWorkout: (workout: WorkoutViewListDto) => void;
  onSelectCustomWorkout: (customWorkout: CustomWorkoutViewListDto) => void;
}

const SearchWorkoutModal = (props: ISearchWorkoutModalProps) => {
  const { t, i18n } = useTranslation();

  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [searchWorkouts, workouts] = useLazySearchWorkoutQuery();
  const [visibleCustomWorkouts, setVisibleCustomWorkouts] = useState<
    CustomWorkoutViewListDto[] | null
  >(null);

  const customWorkouts = useGetCustomWorkoutsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  useDebounce(
    () => {
      if (searchQuery !== null) {
        searchWorkouts({ contains: searchQuery, limit: 10 });
        setVisibleCustomWorkouts(
          customWorkouts.currentData!.data!.filter(
            (value) =>
              value.title!.toLowerCase().includes(searchQuery.toLowerCase()) ||
              value
                .description!.toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
        );
      }
    },
    [searchQuery],
    800
  );

  const onSelectWorkout = (workout: WorkoutViewListDto) => {
    closeModal();
    props.onSelectWorkout(workout);
  };

  const onSelectCustomWorkout = (customWorkout: CustomWorkoutViewListDto) => {
    closeModal();
    props.onSelectCustomWorkout(customWorkout);
  };

  const closeModal = () => {
    setSearchQuery(null);
    setVisibleCustomWorkouts(null);
    props.hideModal();
  };

  const styles = StyleSheet.create({
    header: {
      marginTop: 10,
    },
  });

  return (
    <Modal visible={props.visible} onDismiss={props.hideModal}>
      <DismissKeyboard>
        <Surface style={modalStyles.container} elevation={1}>
          <View style={modalStyles.header}>
            <Text variant="headlineMedium">{t("workout.search")}</Text>
            <IconButton icon="close" onPress={closeModal} />
          </View>
          <Searchbar
            style={modalStyles.input}
            placeholder={t("workout.search")}
            onChangeText={setSearchQuery}
            value={searchQuery ?? ""}
          />
          {searchQuery !== null && (
            <Text style={styles.header} variant="bodyLarge">
              {t("workout.title")}
            </Text>
          )}
          {workouts.isSuccess && workouts.currentData
            ? workouts.currentData.data!.map((value) => {
                if (value.labels[i18n.language] !== undefined) {
                  return (
                    <List.Item
                      key={value.id}
                      title={value.labels[i18n.language].title}
                      description={value.labels[i18n.language].description}
                      onPress={() => onSelectWorkout(value)}
                    />
                  );
                }
              })
            : searchQuery !== null && <LinearProgressBar />}
          {searchQuery !== null && (
            <Text style={styles.header} variant="bodyLarge">
              {t("customWorkout.title")}
            </Text>
          )}
          {visibleCustomWorkouts !== null &&
            visibleCustomWorkouts.length > 0 &&
            visibleCustomWorkouts.map((value) => (
              <List.Item
                key={value.id}
                title={value.title}
                description={value.description}
                onPress={() => onSelectCustomWorkout(value)}
              />
            ))}
        </Surface>
      </DismissKeyboard>
    </Modal>
  );
};

export default SearchWorkoutModal;
