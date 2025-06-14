import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  IconButton,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

import DismissKeyboard from "@/components/shared/dismiss-keyboard";
import LinearProgressBar from "@/components/shared/progress-bar";
import { globalStyles } from "@/components/styles/global";
import {
  ExerciseLogCreateDto,
  UnitViewDto,
  useCreateWorkoutLogMutation,
  useLazyGetWorkoutQuery,
} from "@/store/slices/apiSlice";
import { setMessage } from "@/store/slices/messageSlice";
import { capitalize } from "@/store/utils/utilities";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useDispatch } from "react-redux";

interface IExerciseEntryField {
  workoutExerciseId: number;
  details: string;
}

interface IAddWorkoutLogFormProps {
  details: string;
  exerciseEntries: IExerciseEntryField[];
}

const HistoryAddWorkoutPage = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const [getWorkout, workout] = useLazyGetWorkoutQuery();

  const [createWorkoutLog] = useCreateWorkoutLogMutation();

  const [inputExerciseMapping, setInputExerciseMapping] = useState<Record<
    number,
    number[]
  > | null>(null);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IAddWorkoutLogFormProps>({
    defaultValues: {
      details: "",
      exerciseEntries: [],
    },
  });

  const exerciseEntryFields = useFieldArray({
    control,
    name: "exerciseEntries",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWorkout({
          id: id.toString(),
        }).unwrap();

        let localInputExerciseMapping: Record<number, number[]> = {};

        const addExerciseEntryField = (workoutExerciseId: number) => {
          exerciseEntryFields.append({
            workoutExerciseId: workoutExerciseId,
            details: "",
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

        let inputIndex = 0;
        for (const exercise of response.data!.exercises) {
          const workoutExerciseId = exercise.id;
          if (exercise.unit.type === "GROUP") {
            for (let index = 0; index < exercise.quantity; index += 1) {
              addExerciseEntryField(workoutExerciseId);
              addInputExercise(inputIndex, workoutExerciseId);
              inputIndex += 1;
            }
          } else {
            addExerciseEntryField(workoutExerciseId);
            addInputExercise(inputIndex, workoutExerciseId);
            inputIndex += 1;
          }
        }

        setInputExerciseMapping(localInputExerciseMapping);
      } catch (err) {
        const error = err as any;
        dispatch(setMessage({ data: error, type: "payload" }));
      }
    };
    fetchData();
  }, [id]);

  const onSubmit: SubmitHandler<IAddWorkoutLogFormProps> = async (
    data: IAddWorkoutLogFormProps
  ) => {
    try {
      let workoutExerciseDetails: Record<string, string[]> = {};
      for (const workoutExerciseId of Object.keys(inputExerciseMapping!)) {
        workoutExerciseDetails[workoutExerciseId] = [];
      }
      for (const exercise of data.exerciseEntries) {
        workoutExerciseDetails[exercise.workoutExerciseId.toString()].push(
          exercise.details
        );
      }

      await createWorkoutLog({
        workoutLogCreateDto: {
          workoutId: id.toString(),
          details: data.details,
          exercises: Object.entries(workoutExerciseDetails).map(
            ([key, value]) =>
              ({
                workoutExerciseId: parseInt(key),
                detailsList: value,
              }) as ExerciseLogCreateDto
          ),
        },
      });
    } catch (err) {
      const error = err as any;
      dispatch(setMessage({ data: error, type: "payload" }));
    } finally {
      reset();
      navigation.goBack();
    }
  };

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
      return `${capitalize(unit.code!)} ${index + 1}`;
    } else {
      return unit.code;
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <DismissKeyboard>
        <Surface style={styles.container} elevation={4}>
          {workout.isSuccess &&
          workout.currentData &&
          workout.currentData.success ? (
            <View style={styles.paddedSection}>
              <View style={globalStyles.header}>
                <Text variant="headlineLarge">{t("workoutLog.add")}</Text>
                <IconButton
                  icon="content-save"
                  mode="outlined"
                  onPress={handleSubmit(onSubmit)}
                />
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
                  />
                )}
              />
              <Text variant="headlineMedium">{t("exercise.title")}</Text>
              {inputExerciseMapping !== null &&
                workout.currentData?.data!.exercises.map(
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
                                        index
                                      )}
                                      mode="outlined"
                                      autoCapitalize="none"
                                      onBlur={onBlur}
                                      onChangeText={onChange}
                                      value={value}
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
                    return undefined;
                  }
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

export default HistoryAddWorkoutPage;
