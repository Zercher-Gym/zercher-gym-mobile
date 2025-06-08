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
  CustomExerciseViewDto,
  ExerciseViewDto,
  useGetCustomExercisesQuery,
  useLazySearchExerciseQuery,
} from "@/store/slices/apiSlice";
import useDebounce from "../hooks/debounce";
import DismissKeyboard from "../shared/dismiss-keyboard";
import LinearProgressBar from "../shared/progress-bar";
import { modalStyles } from "../styles/modal";
import { IModalProps } from "../types/modal-props";

interface ISearchExerciseModalProps extends IModalProps {
  onSelectExercise: (exercise: ExerciseViewDto) => void;
  onSelectCustomExercise: (customExercise: CustomExerciseViewDto) => void;
}

const SearchExerciseModal = (props: ISearchExerciseModalProps) => {
  const { t, i18n } = useTranslation();

  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [searchExercises, exercises] = useLazySearchExerciseQuery();
  const [visibleCustomExercises, setVisibleCustomExercises] = useState<
    CustomExerciseViewDto[] | null
  >(null);

  const customExercises = useGetCustomExercisesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  useDebounce(
    () => {
      if (searchQuery !== null) {
        searchExercises({ contains: searchQuery, limit: 10 });
        setVisibleCustomExercises(
          customExercises.currentData!.data!.filter(
            (value) =>
              value.title!.toLowerCase().includes(searchQuery) ||
              value.description!.toLowerCase().includes(searchQuery)
          )
        );
      }
    },
    [searchQuery],
    800
  );

  const onSelectExercise = (exercise: ExerciseViewDto) => {
    closeModal();
    props.onSelectExercise(exercise);
  };

  const onSelectCustomExercise = (customExercise: CustomExerciseViewDto) => {
    closeModal();
    props.onSelectCustomExercise(customExercise);
  };

  const closeModal = () => {
    setSearchQuery(null);
    setVisibleCustomExercises(null);
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
            <Text variant="headlineMedium">{t("exercise.search")}</Text>
            <IconButton icon="close" onPress={closeModal} />
          </View>
          <Searchbar
            style={modalStyles.input}
            placeholder={t("exercise.search")}
            onChangeText={setSearchQuery}
            value={searchQuery ?? ""}
          />
          {searchQuery !== null && (
            <Text style={styles.header} variant="bodyLarge">
              {t("exercise.title")}
            </Text>
          )}
          {exercises.isSuccess && exercises.currentData
            ? exercises.currentData.data!.map((value) => {
                if (value.labels[i18n.language] !== undefined) {
                  return (
                    <List.Item
                      key={value.id}
                      title={value.labels[i18n.language].title}
                      description={value.labels[i18n.language].description}
                      onPress={() => onSelectExercise(value)}
                    />
                  );
                }
              })
            : searchQuery !== null && <LinearProgressBar />}
          {searchQuery !== null && (
            <Text style={styles.header} variant="bodyLarge">
              {t("customExercise.title")}
            </Text>
          )}
          {visibleCustomExercises !== null &&
            visibleCustomExercises.length > 0 &&
            visibleCustomExercises.map((value) => (
              <List.Item
                key={value.id}
                title={value.title}
                description={value.description}
                onPress={() => onSelectCustomExercise(value)}
              />
            ))}
        </Surface>
      </DismissKeyboard>
    </Modal>
  );
};

export default SearchExerciseModal;
