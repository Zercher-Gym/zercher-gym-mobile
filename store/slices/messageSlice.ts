import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type MessageType = "code" | "payload" | "string" | null;

export interface IMessageSlice {
  data: any | null;
  type: MessageType;
}

const initialState: IMessageSlice = {
  data: null,
  type: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (
      state: IMessageSlice,
      action: PayloadAction<{
        data: Object | null;
        type: MessageType;
      }>
    ) => {
      state.data = action.payload.data;
      state.type = action.payload.type;
    },
    clearMessage: (state: IMessageSlice) => {
      state.data = null;
      state.type = null;
    },
  },
});

const selectSelf = (state: RootState) => state;
const selectMessage = createSelector(
  selectSelf,
  (state: RootState) => state.message
);

export const { setMessage, clearMessage } = messageSlice.actions;
export { selectMessage };
export default messageSlice;
