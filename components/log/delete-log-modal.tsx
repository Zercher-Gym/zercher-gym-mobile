import { useTranslation } from "react-i18next";
import { Button, Dialog, Text } from "react-native-paper";
import { useDispatch } from "react-redux";

import {
    useDeleteWorkoutLogMutation
} from "@/store/slices/apiSlice";
import { setMessage } from "@/store/slices/messageSlice";
import { IModalPropsSuccess } from "../types/modal-props";

interface IDeleteLogModalProps extends IModalPropsSuccess {
  workoutLogId: string | null;
}

const DeleteLogModal = (props: IDeleteLogModalProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [deleteWorkoutLog] = useDeleteWorkoutLogMutation();

  const onDelete = async () => {
    try {
      await deleteWorkoutLog({
        id: props.workoutLogId!,
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
      <Dialog.Title>{t("workoutLog.delete")}</Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium">{t("workoutLog.deleteConfirmation")}</Text>
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

export default DeleteLogModal;
