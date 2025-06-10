import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { Surface, Text, TextInput, useTheme } from "react-native-paper";

import DismissKeyboard from "@/components/shared/dismiss-keyboard";
import LinearProgressBar from "@/components/shared/progress-bar";
import { globalStyles } from "@/components/styles/global";
import {
  CustomWorkoutCustomExerciseViewDto,
  UnitViewDto,
  useLazyGetCustomWorkoutQuery,
  useLazyGetWorkoutLogQuery,
  useLazyGetWorkoutQuery,
} from "@/store/slices/apiSlice";
import { setMessage } from "@/store/slices/messageSlice";
import { capitalize } from "@/store/utils/utilities";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

interface IExerciseEntryField {
  workoutExerciseId: number;
  details: string;
}

interface IEditWorkoutLogFormProps {
  details: string;
  exerciseEntries: IExerciseEntryField[];
  customExerciseEntries: IExerciseEntryField[];
}

const HistoryEditWorkoutPage = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const [getWorkout, workout] = useLazyGetWorkoutQuery();
  const [getCustomWorkout, customWorkout] = useLazyGetCustomWorkoutQuery();
  const [getWorkoutLog, workoutLog] = useLazyGetWorkoutLogQuery();

  const [inputExerciseMapping, setInputExerciseMapping] = useState<Record<
    number,
    number[]
  > | null>(null);
  const [inputExerciseValues, setInputExerciseValues] = useState<Record<
    number,
    string[]
  > | null>(null);

  const [inputCustomExerciseMapping, setInputCustomExerciseMapping] =
    useState<Record<number, number[]> | null>(null);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IEditWorkoutLogFormProps>({
    defaultValues: {
      details: "",
      exerciseEntries: [],
    },
  });

  const exerciseEntryFields = useFieldArray({
    control,
    name: "exerciseEntries",
  });

  const customExerciseEntryFields = useFieldArray({
    control,
    name: "customExerciseEntries",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workoutLogResponse = await getWorkoutLog({
          id: id.toString(),
        }).unwrap();

        let exerciseLogs: Record<number, string[]> = {};
        let customExerciseLogs: Record<number, string[]> = {};

        for (const exerciseLog of workoutLogResponse.data!.exerciseLogs!) {
          if (exerciseLog.workoutExerciseId !== null) {
            if (exerciseLogs[exerciseLog.workoutExerciseId!]) {
              exerciseLogs[exerciseLog.workoutExerciseId!] = exerciseLogs[
                exerciseLog.workoutExerciseId!
              ].concat([exerciseLog.details!]);
            } else {
              exerciseLogs[exerciseLog.workoutExerciseId!] = [
                exerciseLog.details!,
              ];
            }
          } else if (exerciseLog.customWorkoutExerciseId !== null) {
            if (customExerciseLogs[exerciseLog.customWorkoutExerciseId!]) {
              customExerciseLogs[exerciseLog.customWorkoutExerciseId!] =
                customExerciseLogs[exerciseLog.customWorkoutExerciseId!].concat(
                  [exerciseLog.details!]
                );
            } else {
              customExerciseLogs[exerciseLog.customWorkoutExerciseId!] = [
                exerciseLog.details!,
              ];
            }
          }
        }

        let response = null;
        if (workoutLogResponse.data?.customWorkoutId !== null) {
          response = await getCustomWorkout({
            id: workoutLogResponse.data?.customWorkoutId!,
          }).unwrap();
        } else {
          response = await getWorkout({
            id: workoutLogResponse.data.workoutId!,
          }).unwrap();
        }

        let localInputExerciseMapping: Record<number, number[]> = {};

        const addExerciseEntryField = (
          workoutExerciseId: number,
          value: string
        ) => {
          exerciseEntryFields.append({
            workoutExerciseId: workoutExerciseId,
            details: value,
          });
        };

        const addInputExercise = (
          inputIndex: number,
          workoutExerciseId: number
        ) => {
          if (localInputExerciseMapping[workoutExerciseId]) {
            localInputExerciseMapping = {
              ...localInputExerciseMapping,
              [workoutExerciseId]: localInputExerciseMapping[
                workoutExerciseId
              ].concat([inputIndex]),
            };
          } else {
            localInputExerciseMapping = {
              ...localInputExerciseMapping,
              [workoutExerciseId]: [inputIndex],
            };
          }
        };

        let localInputCustomExerciseMapping: Record<number, number[]> = {};

        const addCustomExerciseEntryField = (
          workoutCustomExerciseId: number,
          value: string
        ) => {
          customExerciseEntryFields.append({
            workoutExerciseId: workoutCustomExerciseId,
            details: value,
          });
        };

        const addInputCustomExercise = (
          inputIndex: number,
          workoutCustomExerciseId: number
        ) => {
          if (localInputCustomExerciseMapping[workoutCustomExerciseId]) {
            localInputCustomExerciseMapping = {
              ...localInputCustomExerciseMapping,
              [workoutCustomExerciseId]: localInputCustomExerciseMapping[
                workoutCustomExerciseId
              ].concat([inputIndex]),
            };
          } else {
            localInputCustomExerciseMapping = {
              ...localInputCustomExerciseMapping,
              [workoutCustomExerciseId]: [inputIndex],
            };
          }
        };

        let inputIndex = 0;
        for (const exercise of response.data!.exercises) {
          const workoutExerciseId = exercise.id;
          if (exercise.unit.type === "GROUP") {
            for (let index = 0; index < exercise.quantity; index += 1) {
              addExerciseEntryField(
                workoutExerciseId,
                customExerciseLogs[workoutExerciseId][index]
              );
              addInputExercise(inputIndex, workoutExerciseId);
              inputIndex += 1;
            }
          } else {
            addExerciseEntryField(
              workoutExerciseId,
              customExerciseLogs[workoutExerciseId][0]
            );
            addInputExercise(inputIndex, workoutExerciseId);
            inputIndex += 1;
          }
        }
        setInputExerciseMapping(localInputExerciseMapping);

        if (workoutLogResponse.data?.customWorkoutId !== null) {
          inputIndex = 0;
          for (const customExercise of (response.data as any)
            .customExercises as CustomWorkoutCustomExerciseViewDto[]) {
            const workoutExerciseId = customExercise.id;
            if (customExercise.unit.type === "GROUP") {
              for (let index = 0; index < customExercise.quantity; index += 1) {
                addCustomExerciseEntryField(
                  workoutExerciseId,
                  exerciseLogs[workoutExerciseId][index]
                );
                addInputCustomExercise(inputIndex, workoutExerciseId);
                inputIndex += 1;
              }
            } else {
              addCustomExerciseEntryField(
                workoutExerciseId,
                exerciseLogs[workoutExerciseId][0]
              );
              addInputCustomExercise(inputIndex, workoutExerciseId);
              inputIndex += 1;
            }
          }
          setInputCustomExerciseMapping(localInputCustomExerciseMapping);
        }
      } catch (err) {
        const error = err as any;
        dispatch(setMessage({ data: error, type: "payload" }));
      }
    };
    fetchData();
  }, [id]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    paddedSection: {
      paddingHorizontal: 30,
      paddingTop: 30,
    },
    error: {
      marginBottom: 10,
      marginLeft: 5,
      color: theme.colors.error,
    },
    exercise: {
      marginTop: 20,
    },
    input: {
      marginTop: 5,
      marginBottom: 5,
    },
  });

  const getFieldLabel = (unit: UnitViewDto, index: number) => {
    if (unit.type === "GROUP") {
      return `${capitalize(unit.code!)} ${index}`;
    } else {
      return unit.code;
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <DismissKeyboard>
        <Surface style={styles.container} elevation={4}>
          {customWorkout.isSuccess &&
          customWorkout.currentData &&
          customWorkout.currentData.success ? (
            <View style={styles.paddedSection}>
              <View style={globalStyles.header}>
                <Text variant="headlineLarge">
                  {customWorkout.currentData.data?.title}
                </Text>
              </View>
              <Controller
                control={control}
                name="details"
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextInput
                    label={t("details.title", { ns: "properties" })}
                    mode="outlined"
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.details}
                    style={globalStyles.input}
                    disabled={true}
                  />
                )}
              />
              <Text variant="headlineMedium">{t("exercise.title")}</Text>
              {inputExerciseMapping !== null &&
                customWorkout.currentData?.data!.exercises.map(
                  (exerciseWorkout, exerciseWorkoutIndex) => {
                    if (
                      exerciseWorkout.labels &&
                      exerciseWorkout.labels[i18n.language]
                    ) {
                      return (
                        <View
                          style={styles.exercise}
                          key={`${exerciseWorkout}-${exerciseWorkoutIndex}`}
                        >
                          <Text variant="titleMedium">
                            {exerciseWorkout.labels[i18n.language].title}
                          </Text>
                          {inputExerciseMapping[exerciseWorkout.id].map(
                            (fieldId, index) => (
                              <View key={`${fieldId}-${index}`}>
                                <Controller
                                  control={control}
                                  name={`exerciseEntries.${fieldId}.details`}
                                  rules={{
                                    required: t("details.requiredError", {
                                      ns: "properties",
                                    }),
                                  }}
                                  render={({
                                    field: { onChange, value, onBlur },
                                  }) => (
                                    <TextInput
                                      label={getFieldLabel(
                                        exerciseWorkout.unit,
                                        index + 1
                                      )}
                                      mode="outlined"
                                      autoCapitalize="none"
                                      onBlur={onBlur}
                                      onChangeText={onChange}
                                      value={value}
                                      disabled={true}
                                      error={
                                        !!(
                                          errors.exerciseEntries &&
                                          errors.exerciseEntries[fieldId]
                                            ?.details
                                        )
                                      }
                                      style={styles.input}
                                    />
                                  )}
                                />
                                {errors.exerciseEntries &&
                                  errors.exerciseEntries[fieldId]?.details && (
                                    <Text style={styles.error}>
                                      {
                                        errors.exerciseEntries[fieldId]?.details
                                          .message
                                      }
                                    </Text>
                                  )}
                              </View>
                            )
                          )}
                        </View>
                      );
                    }
                  }
                )}
              {inputCustomExerciseMapping !== null &&
                customWorkout.currentData?.data!.customExercises.map(
                  (customExerciseWorkout, customExerciseWorkoutIndex) => (
                    <View
                      style={styles.exercise}
                      key={`${customExerciseWorkout}-${customExerciseWorkoutIndex}`}
                    >
                      <Text variant="titleMedium">
                        {customExerciseWorkout.title}
                      </Text>
                      {inputCustomExerciseMapping[customExerciseWorkout.id].map(
                        (fieldId, index) => (
                          <View key={`${fieldId}-${index}`}>
                            <Controller
                              control={control}
                              name={`customExerciseEntries.${fieldId}.details`}
                              rules={{
                                required: t("details.requiredError", {
                                  ns: "properties",
                                }),
                              }}
                              render={({
                                field: { onChange, value, onBlur },
                              }) => (
                                <TextInput
                                  label={getFieldLabel(
                                    customExerciseWorkout.unit,
                                    index + 1
                                  )}
                                  mode="outlined"
                                  autoCapitalize="none"
                                  onBlur={onBlur}
                                  onChangeText={onChange}
                                  value={value}
                                  error={
                                    !!(
                                      errors.customExerciseEntries &&
                                      errors.customExerciseEntries[fieldId]
                                        ?.details
                                    )
                                  }
                                  style={styles.input}
                                />
                              )}
                            />
                            {errors.customExerciseEntries &&
                              errors.customExerciseEntries[fieldId]
                                ?.details && (
                                <Text style={styles.error}>
                                  {
                                    errors.customExerciseEntries[fieldId]
                                      ?.details.message
                                  }
                                </Text>
                              )}
                          </View>
                        )
                      )}
                    </View>
                  )
                )}
            </View>
          ) : (
            <LinearProgressBar />
          )}
          {isSubmitting && <LinearProgressBar />}
        </Surface>
      </DismissKeyboard>
    </ScrollView>
  );
};

export default HistoryEditWorkoutPage;
