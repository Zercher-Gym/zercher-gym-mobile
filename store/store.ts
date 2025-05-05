import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import storage from "./utils/storage";

import { api } from "./slices/apiSlice";
import authenticationSlice from "./slices/authenticationSlice";
import themeSlice from "./slices/themeSlice";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["theme", "authentication"],
};

const rootReducer = combineReducers({
  theme: themeSlice.reducer,
  authentication: authenticationSlice.reducer,
  api: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
