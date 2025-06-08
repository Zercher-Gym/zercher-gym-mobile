import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import {
    IconButton,
    List,
    Portal,
    Surface,
    Text,
    TextInput,
    useTheme,
} from "react-native-paper";

import SearchExerciseModal from "@/components/exercise/search-exercise";
import DismissKeyboard from "@/components/shared/dismiss-keyboard";
import LinearProgressBar from "@/components/shared/progress-bar";
import { globalStyles } from "@/components/styles/global";
import { modalStyles } from "@/components/styles/modal";
import {
    CustomExerciseViewDto,
    CustomWorkoutCreateUpdateDto,
    ExerciseViewDto,
    useCreateCustomWorkoutMutation,
    useLazyGetCustomWorkoutQuery,
    useUpdateCustomWorkoutMutation,
} from "@/store/slices/apiSlice";
import { setMessage } from "@/store/slices/messageSlice";
import { useNavigation } from "expo-router";
import {
    Controller,
    SubmitHandler,
    useFieldArray,
    useForm,
} from "react-hook-form";
import { Dropdown } from "react-native-paper-dropdown";
import { useDispatch } from "react-redux";

interface IAddWorkoutPageProps {
  customWorkoutId?: string;
}

interface ICustomExerciseField extends CustomExerciseViewDto {
  quantity: number;
  unitId: number;
}

interface IExerciseField extends ExerciseViewDto {
  quantity: number;
  unitId: number;
}

interface IAddWorkoutFormProps {
  title: string;
  description: string;
  customExercises: ICustomExerciseField[];
  exercises: IExerciseField[];
}

const CustomWorkoutAddPage = (props: IAddWorkoutPageProps) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [updateCustomWorkout] = useUpdateCustomWorkoutMutation();
  const [createCustomWorkout] = useCreateCustomWorkoutMutation();

  const [getCustomWorkout] = useLazyGetCustomWorkoutQuery();

  const [isSearchExerciseVisible, setIsSearchExerciseVisible] = useState(false);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IAddWorkoutFormProps>({
    defaultValues: {
      title: "",
      description: "",
      customExercises: [],
      exercises: [],
    },
  });

  const customExerciseFields = useFieldArray({
    control,
    name: "customExercises",
  });

  const exerciseFields = useFieldArray({
    control,
    name: "exercises",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (props.customWorkoutId) {
        try {
          const response = await getCustomWorkout({
            id: props.customWorkoutId,
          }).unwrap();

          reset({
            title: response.data?.title,
            description: response.data?.description,
          });

          for (const exercise of response.data!.exercises) {
            exerciseFields.append({
              ...exercise,
              id: exercise.exerciseId,
              unitId: exercise.unit.id,
            });
          }

          for (const customExercise of response.data!.customExercises) {
            customExerciseFields.append({
              ...customExercise,
              id: customExercise.customExerciseId,
              unitId: customExercise.unit.id,
            });
          }
        } catch (err) {
          const error = err as any;
          dispatch(setMessage({ data: error, type: "payload" }));
        }
      }
    };
    fetchData();
  }, [props.customWorkoutId]);

  const onAddCustomExercise = (customExercise: CustomExerciseViewDto) => {
    customExerciseFields.append({
      ...customExercise,
      quantity: 0,
      unitId: customExercise.unit.id,
    });
  };

  const onRemoveCustomExercise = (id: number) => {
    customExerciseFields.remove(id);
  };

  const onAddExercise = (exercise: ExerciseViewDto) => {
    exerciseFields.append({
      ...exercise,
      quantity: 0,
      unitId: exercise.units[0].id,
    });
  };

  const onRemoveExercise = (id: number) => {
    exerciseFields.remove(id);
  };

  const onSubmit: SubmitHandler<IAddWorkoutFormProps> = async (
    data: IAddWorkoutFormProps
  ) => {
    try {
      const requestData: CustomWorkoutCreateUpdateDto = {
        ...data,
        customExercises:
          data.customExercises &&
          data.customExercises.map((value) => ({
            customExerciseId: value.id,
            quantity: value.quantity,
            unitId: value.unitId,
          })),
        exercises:
          data.exercises &&
          data.exercises.map((value) => ({
            exerciseId: value.id,
            quantity: value.quantity,
            unitId: value.unitId,
          })),
      };

      if (props.customWorkoutId) {
        await updateCustomWorkout({
          customWorkoutCreateUpdateDto: requestData,
          id: props.customWorkoutId,
        }).unwrap();
      } else {
        await createCustomWorkout({
          customWorkoutCreateUpdateDto: requestData,
        }).unwrap();
      }
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
    quantityInput: {
      width: 60,
    },
    unitInput: {
      width: 60,
    },
    quantityInputCustom: {
      width: 100,
    },
    fieldsGroup: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  });

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <DismissKeyboard>
        <Surface style={styles.container} elevation={4}>
          <View style={styles.paddedSection}>
            <View style={globalStyles.header}>
              <Text variant="headlineLarge">
                {props.customWorkoutId
                  ? t("application.edit")
                  : t("application.add")}
              </Text>
              <IconButton
                icon="content-save"
                mode="outlined"
                onPress={handleSubmit(onSubmit)}
              />
            </View>
            <Controller
              control={control}
              name="title"
              rules={{
                required: t("title.requiredError", {
                  ns: "properties",
                }),
              }}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  label={t("title.title", { ns: "properties" })}
                  mode="outlined"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.title}
                  style={globalStyles.input}
                />
              )}
            />
            {errors.title && (
              <Text style={styles.error}>{errors.title.message}</Text>
            )}
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  label={t("description.title", { ns: "properties" })}
                  mode="outlined"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.description}
                  style={modalStyles.input}
                />
              )}
            />
            {errors.description && (
              <Text style={styles.error}>{errors.description.message}</Text>
            )}
            <View style={globalStyles.header}>
              <Text variant="headlineMedium">{t("exercise.title")}</Text>
              <IconButton
                icon="plus"
                onPress={() => setIsSearchExerciseVisible(true)}
              />
            </View>
          </View>
          {customExerciseFields.fields.map((customExercise, id) => (
            <List.Item
              key={`${customExercise.id}-${id}`}
              title={customExercise.title}
              description={customExercise.description}
              left={(props) => (
                <IconButton
                  {...props}
                  icon="close"
                  onPress={() => onRemoveCustomExercise(id)}
                />
              )}
              right={(props) => (
                <Controller
                  control={control}
                  name={`customExercises.${id}.quantity`}
                  rules={{
                    required: t("quantity.requiredError", {
                      ns: "properties",
                    }),
                  }}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextInput
                      {...props}
                      mode="outlined"
                      inputMode="decimal"
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value.toString()}
                      style={styles.quantityInputCustom}
                      error={
                        !!(
                          errors.customExercises &&
                          errors.customExercises[id]?.quantity
                        )
                      }
                      right={
                        <TextInput.Affix text={customExercise.unit.code} />
                      }
                    />
                  )}
                />
              )}
            />
          ))}
          {exerciseFields.fields.map((exercise, id) => {
            if (exercise.labels[i18n.language] !== undefined) {
              return (
                <List.Item
                  key={`${exercise.id}-${id}`}
                  title={exercise.labels[i18n.language].title}
                  description={exercise.labels[i18n.language].description}
                  left={(props) => (
                    <IconButton
                      {...props}
                      icon="close"
                      onPress={() => onRemoveExercise(id)}
                    />
                  )}
                  right={(props) => (
                    <View style={styles.fieldsGroup}>
                      <Controller
                        control={control}
                        name={`exercises.${id}.quantity`}
                        rules={{
                          required: t("quantity.requiredError", {
                            ns: "properties",
                          }),
                        }}
                        render={({ field: { onChange, value, onBlur } }) => (
                          <TextInput
                            {...props}
                            mode="outlined"
                            inputMode="decimal"
                            autoCapitalize="none"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value.toString()}
                            style={styles.quantityInput}
                            error={
                              !!(
                                errors.customExercises &&
                                errors.customExercises[id]?.quantity
                              )
                            }
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`exercises.${id}.unitId`}
                        render={({ field: { onChange, value, onBlur } }) => (
                          <View style={styles.unitInput}>
                            <Dropdown
                              hideMenuHeader={true}
                              menuDownIcon={null}
                              mode="outlined"
                              options={exercise.units!.map((unit) => ({
                                label: unit.code!,
                                value: unit.id.toString(),
                              }))}
                              onSelect={onChange}
                              value={value.toString()}
                              error={
                                !!(
                                  errors.customExercises &&
                                  errors.customExercises[id]?.unitId
                                )
                              }
                            />
                          </View>
                        )}
                      />
                    </View>
                  )}
                />
              );
            }
          })}
          {isSubmitting && <LinearProgressBar />}
        </Surface>
      </DismissKeyboard>
      <Portal>
        <SearchExerciseModal
          visible={isSearchExerciseVisible}
          hideModal={() => setIsSearchExerciseVisible(false)}
          onSelectCustomExercise={onAddCustomExercise}
          onSelectExercise={onAddExercise}
        />
      </Portal>
    </ScrollView>
  );
};

export default CustomWorkoutAddPage;
