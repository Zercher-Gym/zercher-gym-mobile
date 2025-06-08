import { setMessage } from "@/store/slices/messageSlice";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import {
  Button,
  IconButton,
  Modal,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { useDispatch } from "react-redux";

import {
  CustomExerciseUpdateDto,
  CustomExerciseViewDto,
  useGetUnitsQuery,
  useUpdateCustomExerciseMutation,
} from "@/store/slices/apiSlice";
import DismissKeyboard from "../shared/dismiss-keyboard";
import { modalStyles } from "../styles/modal";
import { IModalPropsSuccess } from "../types/modal-props";

interface IEditExerciseModal extends IModalPropsSuccess {
  customExercise: CustomExerciseViewDto | null;
}

const EditExerciseModal = (props: IEditExerciseModal) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();

  const units = useGetUnitsQuery({ page: 0, size: 20 });

  const [updateCustomExercise] = useUpdateCustomExerciseMutation();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomExerciseUpdateDto>({
    defaultValues: {
      title: "",
      description: "",
      unitId: 1,
    },
  });

  useEffect(() => {
    reset({
      title: props.customExercise?.title,
      description: props.customExercise?.description,
      unitId: props.customExercise?.unit.id,
    });
  }, [props.customExercise]);

  const onSubmit: SubmitHandler<CustomExerciseUpdateDto> = async (
    data: CustomExerciseUpdateDto
  ) => {
    try {
      await updateCustomExercise({
        id: props.customExercise!.id,
        customExerciseUpdateDto: data,
      }).unwrap();
    } catch (err) {
      const error = err as any;
      dispatch(setMessage({ data: error, type: "payload" }));
    } finally {
      closeModal();
      props.onSuccess();
    }
  };

  const closeModal = () => {
    reset();
    props.hideModal();
  };

  const styles = StyleSheet.create({
    error: {
      marginBottom: 10,
      marginLeft: 5,
      color: theme.colors.error,
    },
  });

  return (
    <Modal
      style={{ marginTop: 10 }}
      contentContainerStyle={{ marginTop: 10 }}
      visible={props.visible}
      onDismiss={props.hideModal}
    >
      <DismissKeyboard>
        <Surface style={modalStyles.container} elevation={1}>
          <View style={modalStyles.header}>
            <Text variant="headlineMedium">{t("customExercise.add")}</Text>
            <IconButton icon="close" onPress={closeModal} />
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
                style={modalStyles.input}
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
          <Controller
            control={control}
            name="unitId"
            render={({ field: { onChange, value, onBlur } }) => (
              <View style={modalStyles.input}>
                <Dropdown
                  mode="outlined"
                  label={t("unit.title", { ns: "properties" })}
                  options={
                    units.isSuccess && units.currentData?.success
                      ? units.currentData.data!.map((unit) => ({
                          label: unit.code!,
                          value: unit.id.toString(),
                        }))
                      : []
                  }
                  onSelect={onChange}
                  value={value.toString()}
                  error={!!errors.unitId}
                />
              </View>
            )}
          />
          {errors.unitId && (
            <Text style={styles.error}>{errors.unitId.message}</Text>
          )}
          <Button
            mode="contained"
            style={modalStyles.submitButton}
            loading={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          >
            {t("application.create")}
          </Button>
        </Surface>
      </DismissKeyboard>
    </Modal>
  );
};

export default EditExerciseModal;
