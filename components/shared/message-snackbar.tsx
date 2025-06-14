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
      if (message.type === "code") {
        setDisplayMessage(t(message.data, { ns: "error" }));
      } else if (message.type == "string") {
        setDisplayMessage(message.data);
      } else if (message.type == "payload") {
        const payload = message.data as any;
        if (payload.data !== null && payload.data !== undefined) {
          const errorMessage = t(
            payload.data.error!,
            t("unknownError", { ns: "error" }),
            {
              ns: "error",
            }
          );
          setDisplayMessage(errorMessage);
        } else {
          console.log(payload);
          setDisplayMessage(t("unknownError", { ns: "error" }));
        }
      } else {
        console.log(message);
        setDisplayMessage(t("unknownError", { ns: "error" }));
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
