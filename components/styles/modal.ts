import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 30,
    margin: 30,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    marginVertical: 10,
  },
  submitButton: {
    marginTop: 10,
    width: "100%",
  },
});
