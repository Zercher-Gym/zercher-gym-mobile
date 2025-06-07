import { useDeleteCustomExerciseMutation } from "@/store/slices/apiSlice";
import { setMessage } from "@/store/slices/messageSlice";
import { useTranslation } from "react-i18next";
import { Button, Dialog, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { IModalProps } from "../types/modal-props";

interface IDeleteExerciseModalProps extends IModalProps {
  customExerciseId: string | null;
}

const DeleteExerciseModal = (props: IDeleteExerciseModalProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [deleteCustomExercise] = useDeleteCustomExerciseMutation();

  const onDelete = async () => {
    try {
      await deleteCustomExercise({
        id: props.customExerciseId!,
      }).unwrap();
    } catch (err) {
      const error = err as any;
      dispatch(setMessage({ data: error, type: "payload" }));
    } finally {
      props.hideModal();
      props.onSuccess();
    }
  };

  return (
    <Dialog visible={props.visible} onDismiss={props.hideModal}>
      <Dialog.Title>{t("customExercise.delete")}</Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium">
          {t("customExercise.deleteConfirmation")}
        </Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button mode="contained" onPress={props.hideModal}>
          {t("application.close")}
        </Button>
        <Button mode="outlined" onPress={onDelete}>
          {t("application.delete")}
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DeleteExerciseModal;
