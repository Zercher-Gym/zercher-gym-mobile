import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import data from "../../config/config.json";
import { RootState } from "../store";

import { removeToken } from "./authenticationSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: data.apiUrl,
  mode: "cors",
  timeout: 5000,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    if (state.authentication.token !== null)
      headers.set("Authorization", `Bearer ${state.authentication.token}`);
    return headers;
  },
});

const baseQueryWithAuthorizationHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    api.dispatch(removeToken());
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuthorizationHandling,
  endpoints: () => ({}),
});
