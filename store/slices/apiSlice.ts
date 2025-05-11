import { baseApi as api } from "./baseApiSlice";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    authenticateUserAdmin: build.mutation<
      AuthenticateUserAdminApiResponse,
      AuthenticateUserAdminApiArg
    >({
      query: (queryArg) => ({
        url: `/api/auth/admin/signin`,
        method: "POST",
        body: queryArg.userSignInDto,
      }),
    }),
    confirmEmailSend: build.mutation<
      ConfirmEmailSendApiResponse,
      ConfirmEmailSendApiArg
    >({
      query: (queryArg) => ({
        url: `/api/auth/confirmEmail/send`,
        method: "POST",
        body: queryArg.userEmailDto,
      }),
    }),
    confirmEmail: build.mutation<ConfirmEmailApiResponse, ConfirmEmailApiArg>({
      query: (queryArg) => ({
        url: `/api/auth/confirmEmail/${queryArg.token}`,
        method: "POST",
      }),
    }),
    resetPasswordSend: build.mutation<
      ResetPasswordSendApiResponse,
      ResetPasswordSendApiArg
    >({
      query: (queryArg) => ({
        url: `/api/auth/resetPassword/send`,
        method: "POST",
        body: queryArg.userEmailDto,
      }),
    }),
    resetPassword: build.mutation<
      ResetPasswordApiResponse,
      ResetPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/auth/resetPassword/${queryArg.token}`,
        method: "POST",
        body: queryArg.userNewPasswordDto,
      }),
    }),
    authenticateUser: build.mutation<
      AuthenticateUserApiResponse,
      AuthenticateUserApiArg
    >({
      query: (queryArg) => ({
        url: `/api/auth/signin`,
        method: "POST",
        body: queryArg.userSignInDto,
      }),
    }),
    createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
      query: (queryArg) => ({
        url: `/api/auth/signup`,
        method: "POST",
        body: queryArg.userSignUpDto,
      }),
    }),
    searchExerciseAdmin: build.query<
      SearchExerciseAdminApiResponse,
      SearchExerciseAdminApiArg
    >({
      query: (queryArg) => ({
        url: `/api/exercise/admin/search`,
        params: {
          page: queryArg.page,
          size: queryArg.size,
          sort: queryArg.sort,
          searchAdminDTO: queryArg.searchAdminDto,
        },
      }),
    }),
    createExercise: build.mutation<
      CreateExerciseApiResponse,
      CreateExerciseApiArg
    >({
      query: (queryArg) => ({
        url: `/api/exercise/create`,
        method: "POST",
        body: queryArg.exerciseCreateDto,
      }),
    }),
    updateLabel: build.mutation<UpdateLabelApiResponse, UpdateLabelApiArg>({
      query: (queryArg) => ({
        url: `/api/exercise/label/${queryArg.id}`,
        method: "PUT",
        body: queryArg.exerciseLabelUpdateDto,
      }),
    }),
    searchExercise: build.query<
      SearchExerciseApiResponse,
      SearchExerciseApiArg
    >({
      query: (queryArg) => ({
        url: `/api/exercise/search`,
        params: {
          searchDTO: queryArg.searchDto,
        },
      }),
    }),
    deleteExercise: build.mutation<
      DeleteExerciseApiResponse,
      DeleteExerciseApiArg
    >({
      query: (queryArg) => ({
        url: `/api/exercise/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getExercise: build.query<GetExerciseApiResponse, GetExerciseApiArg>({
      query: (queryArg) => ({ url: `/api/exercise/${queryArg.id}` }),
    }),
    searchAdmin: build.query<SearchAdminApiResponse, SearchAdminApiArg>({
      query: (queryArg) => ({
        url: `/api/user/admin/search`,
        params: {
          page: queryArg.page,
          size: queryArg.size,
          sort: queryArg.sort,
          searchDTO: queryArg.searchDto,
        },
      }),
    }),
    deleteProfile: build.mutation<
      DeleteProfileApiResponse,
      DeleteProfileApiArg
    >({
      query: (queryArg) => ({
        url: `/api/user/admin/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    updateUserAdmin: build.mutation<
      UpdateUserAdminApiResponse,
      UpdateUserAdminApiArg
    >({
      query: (queryArg) => ({
        url: `/api/user/admin/${queryArg.id}`,
        method: "PUT",
        body: queryArg.userUpdateAdminDto,
      }),
    }),
    deleteProfileCurrent: build.mutation<
      DeleteProfileCurrentApiResponse,
      DeleteProfileCurrentApiArg
    >({
      query: () => ({ url: `/api/user/profile`, method: "DELETE" }),
    }),
    getProfileCurrent: build.query<
      GetProfileCurrentApiResponse,
      GetProfileCurrentApiArg
    >({
      query: () => ({ url: `/api/user/profile` }),
    }),
    updateProfile: build.mutation<
      UpdateProfileApiResponse,
      UpdateProfileApiArg
    >({
      query: (queryArg) => ({
        url: `/api/user/profile`,
        method: "PUT",
        body: queryArg.userUpdateDto,
      }),
    }),
    getProfile: build.query<GetProfileApiResponse, GetProfileApiArg>({
      query: (queryArg) => ({ url: `/api/user/profile/${queryArg.id}` }),
    }),
    search: build.query<SearchApiResponse, SearchApiArg>({
      query: (queryArg) => ({
        url: `/api/user/search`,
        params: {
          searchDTO: queryArg.searchDto,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as api };
export type AuthenticateUserAdminApiResponse =
  /** status 200 OK */ BaseResponseString;
export type AuthenticateUserAdminApiArg = {
  userSignInDto: UserSignInDto;
};
export type ConfirmEmailSendApiResponse = /** status 200 OK */ BaseResponseVoid;
export type ConfirmEmailSendApiArg = {
  userEmailDto: UserEmailDto;
};
export type ConfirmEmailApiResponse = /** status 200 OK */ BaseResponseVoid;
export type ConfirmEmailApiArg = {
  token: string;
};
export type ResetPasswordSendApiResponse =
  /** status 200 OK */ BaseResponseVoid;
export type ResetPasswordSendApiArg = {
  userEmailDto: UserEmailDto;
};
export type ResetPasswordApiResponse = /** status 200 OK */ BaseResponseVoid;
export type ResetPasswordApiArg = {
  token: string;
  userNewPasswordDto: UserNewPasswordDto;
};
export type AuthenticateUserApiResponse =
  /** status 200 OK */ BaseResponseString;
export type AuthenticateUserApiArg = {
  userSignInDto: UserSignInDto;
};
export type CreateUserApiResponse = /** status 200 OK */ BaseResponseVoid;
export type CreateUserApiArg = {
  userSignUpDto: UserSignUpDto;
};
export type SearchExerciseAdminApiResponse =
  /** status 200 OK */ PageResponseExerciseViewAdminDto;
export type SearchExerciseAdminApiArg = {
  /** Zero-based page index (0..N) */
  page?: number;
  /** The size of the page to be returned */
  size?: number;
  /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
  sort?: string[];
  searchAdminDto: ExerciseSearchAdminDto;
};
export type CreateExerciseApiResponse = /** status 200 OK */ BaseResponseVoid;
export type CreateExerciseApiArg = {
  exerciseCreateDto: ExerciseCreateDto;
};
export type UpdateLabelApiResponse = /** status 200 OK */ BaseResponseVoid;
export type UpdateLabelApiArg = {
  id: number;
  exerciseLabelUpdateDto: ExerciseLabelUpdateDto;
};
export type SearchExerciseApiResponse =
  /** status 200 OK */ BaseResponseListExerciseViewDto;
export type SearchExerciseApiArg = {
  searchDto: ExerciseSearchDto;
};
export type DeleteExerciseApiResponse = /** status 200 OK */ BaseResponseVoid;
export type DeleteExerciseApiArg = {
  id: string;
};
export type GetExerciseApiResponse =
  /** status 200 OK */ BaseResponseExerciseViewAdminDto;
export type GetExerciseApiArg = {
  id: string;
};
export type SearchAdminApiResponse =
  /** status 200 OK */ PageResponseUserViewAdminDto;
export type SearchAdminApiArg = {
  /** Zero-based page index (0..N) */
  page?: number;
  /** The size of the page to be returned */
  size?: number;
  /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
  sort?: string[];
  searchDto: UserSearchAdminDto;
};
export type DeleteProfileApiResponse = /** status 200 OK */ BaseResponseVoid;
export type DeleteProfileApiArg = {
  id: string;
};
export type UpdateUserAdminApiResponse = /** status 200 OK */ BaseResponseVoid;
export type UpdateUserAdminApiArg = {
  id: string;
  userUpdateAdminDto: UserUpdateAdminDto;
};
export type DeleteProfileCurrentApiResponse =
  /** status 200 OK */ BaseResponseVoid;
export type DeleteProfileCurrentApiArg = void;
export type GetProfileCurrentApiResponse =
  /** status 200 OK */ BaseResponseUserViewDto;
export type GetProfileCurrentApiArg = void;
export type UpdateProfileApiResponse = /** status 200 OK */ BaseResponseVoid;
export type UpdateProfileApiArg = {
  userUpdateDto: UserUpdateDto;
};
export type GetProfileApiResponse =
  /** status 200 OK */ BaseResponseUserViewDto;
export type GetProfileApiArg = {
  id: string;
};
export type SearchApiResponse =
  /** status 200 OK */ BaseResponseListUserListViewDto;
export type SearchApiArg = {
  searchDto: UserSearchDto;
};
export type BaseResponseString = {
  data?: string;
  error?: string;
  success?: boolean;
};
export type BaseResponseVoid = {
  data?: object;
  error?: string;
  success?: boolean;
};
export type UserSignInDto = {
  password?: string;
  username?: string;
};
export type UserEmailDto = {
  email?: string;
};
export type UserNewPasswordDto = {
  password?: string;
};
export type UserSignUpDto = {
  email?: string;
  password?: string;
  username?: string;
};
export type ExerciseLabelViewAdminDto = {
  description?: string;
  id: number;
  language: "RO" | "EN";
  title?: string;
};
export type ExerciseViewAdminDto = {
  id: string;
  identifier?: string;
  labels: ExerciseLabelViewAdminDto[];
};
export type PageResponseExerciseViewAdminDto = {
  data?: ExerciseViewAdminDto[];
  error?: string;
  pageNumber?: number;
  pageSize?: number;
  success?: boolean;
  totalElements?: number;
};
export type ExerciseSearchAdminDto = {
  description?: string;
  identifier?: string;
  language?: "RO" | "EN";
  title?: string;
};
export type ExerciseLabelCreateDto = {
  description?: string;
  language: "RO" | "EN";
  title?: string;
};
export type ExerciseCreateDto = {
  identifier?: string;
  labels: ExerciseLabelCreateDto[];
};
export type ExerciseLabelUpdateDto = {
  description?: string;
  title?: string;
};
export type ExerciseLabelViewDto = {
  description?: string;
  title?: string;
};
export type ExerciseViewDto = {
  identifier?: string;
  labels: {
    [key: string]: ExerciseLabelViewDto;
  };
};
export type BaseResponseListExerciseViewDto = {
  data?: ExerciseViewDto[];
  error?: string;
  success?: boolean;
};
export type ExerciseSearchDto = {
  contains?: string;
  limit?: number;
};
export type BaseResponseExerciseViewAdminDto = {
  data?: ExerciseViewAdminDto;
  error?: string;
  success?: boolean;
};
export type UserViewAdminDto = {
  createdAt?: string;
  email?: string;
  enabled: boolean;
  id?: string;
  locked: boolean;
  roles?: string[];
  username?: string;
};
export type PageResponseUserViewAdminDto = {
  data?: UserViewAdminDto[];
  error?: string;
  pageNumber?: number;
  pageSize?: number;
  success?: boolean;
  totalElements?: number;
};
export type UserSearchAdminDto = {
  email?: string;
  enabled?: boolean;
  id?: string;
  locked?: boolean;
  username?: string;
};
export type UserUpdateAdminDto = {
  enabled: boolean;
  locked: boolean;
  roles: string[];
};
export type UserViewDto = {
  createdAt?: string;
  email?: string;
  id?: string;
  roles?: string[];
  username?: string;
};
export type BaseResponseUserViewDto = {
  data?: UserViewDto;
  error?: string;
  success?: boolean;
};
export type UserUpdateDto = {
  email?: string;
  username?: string;
};
export type UserListViewDto = {
  id?: string;
  username?: string;
};
export type BaseResponseListUserListViewDto = {
  data?: UserListViewDto[];
  error?: string;
  success?: boolean;
};
export type UserSearchDto = {
  limit: number;
  username: string;
};
export const {
  useAuthenticateUserAdminMutation,
  useConfirmEmailSendMutation,
  useConfirmEmailMutation,
  useResetPasswordSendMutation,
  useResetPasswordMutation,
  useAuthenticateUserMutation,
  useCreateUserMutation,
  useSearchExerciseAdminQuery,
  useCreateExerciseMutation,
  useUpdateLabelMutation,
  useSearchExerciseQuery,
  useDeleteExerciseMutation,
  useGetExerciseQuery,
  useSearchAdminQuery,
  useDeleteProfileMutation,
  useUpdateUserAdminMutation,
  useDeleteProfileCurrentMutation,
  useGetProfileCurrentQuery,
  useUpdateProfileMutation,
  useGetProfileQuery,
  useSearchQuery,
} = injectedRtkApi;
