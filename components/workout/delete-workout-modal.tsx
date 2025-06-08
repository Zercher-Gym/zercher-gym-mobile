import { useTranslation } from "react-i18next";
import { Button, Dialog, Text } from "react-native-paper";
import { useDispatch } from "react-redux";

import { useDeleteCustomWorkoutMutation } from "@/store/slices/apiSlice";
import { setMessage } from "@/store/slices/messageSlice";
import { IModalPropsSuccess } from "../types/modal-props";

interface IDeleteWorkoutModalProps extends IModalPropsSuccess {
  customWorkoutId: string | null;
}

const DeleteWorkoutModal = (props: IDeleteWorkoutModalProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [deleteCustomWorkout] = useDeleteCustomWorkoutMutation();

  const onDelete = async () => {
    try {
      await deleteCustomWorkout({
        id: props.customWorkoutId!,
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
      <Dialog.Title>{t("customWorkout.delete")}</Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium">
          {t("customWorkout.deleteConfirmation")}
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

export default DeleteWorkoutModal;
