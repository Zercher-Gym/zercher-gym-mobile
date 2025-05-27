import { selectMessage, setMessage } from "@/store/slices/messageSlice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

const MessageSnackbar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);

  const [displayMessage, setDisplayMessage] = useState<string | undefined>();

  useEffect(() => {
    if (message.type !== null) {
      switch (message.type) {
        case "code":
          setDisplayMessage(t(message.data, { ns: "error" }));
          break;
        case "string":
          setDisplayMessage(message.data);
          break;
        case "payload":
          const payload = message.data as any;
          if (payload.data !== null && payload.data !== undefined) {
            setDisplayMessage(t(payload.data.error!, { ns: "error" }));
          } else {
            setDisplayMessage(payload);
          }
          break;
        default:
          setDisplayMessage(t("unknownError", { ns: "error" }));
          break;
      }
      dispatch(setMessage({ data: null, type: null }));
    }
  }, [message]);

  const dismissError = () => {
    setDisplayMessage(undefined);
  };

  return (
    <Snackbar
      visible={displayMessage !== undefined}
      onDismiss={dismissError}
      action={{
        label: t("application.close"),
        onPress: dismissError,
      }}
    >
      {displayMessage}
    </Snackbar>
  );
};

export default MessageSnackbar;
