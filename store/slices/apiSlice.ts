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
    confirmEmail1: build.mutation<
      ConfirmEmail1ApiResponse,
      ConfirmEmail1ApiArg
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
    resetPassword1: build.mutation<
      ResetPassword1ApiResponse,
      ResetPassword1ApiArg
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
    deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
      query: (queryArg) => ({
        url: `/api/user/admin/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getProfile: build.query<GetProfileApiResponse, GetProfileApiArg>({
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
    deleteProfile: build.mutation<
      DeleteProfileApiResponse,
      DeleteProfileApiArg
    >({
      query: () => ({ url: `/api/user/profile`, method: "DELETE" }),
    }),
    getProfile1: build.query<GetProfile1ApiResponse, GetProfile1ApiArg>({
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
export type ConfirmEmail1ApiResponse = /** status 200 OK */ BaseResponseVoid;
export type ConfirmEmail1ApiArg = {
  userEmailDto: UserEmailDto;
};
export type ConfirmEmailApiResponse = /** status 200 OK */ BaseResponseVoid;
export type ConfirmEmailApiArg = {
  token: string;
};
export type ResetPassword1ApiResponse = /** status 200 OK */ BaseResponseVoid;
export type ResetPassword1ApiArg = {
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
export type UpdateUserAdminApiResponse = /** status 200 OK */ BaseResponseVoid;
export type UpdateUserAdminApiArg = {
  id: string;
  userUpdateAdminDto: UserUpdateAdminDto;
};
export type DeleteUserApiResponse = /** status 200 OK */ BaseResponseVoid;
export type DeleteUserApiArg = {
  id: string;
};
export type GetProfileApiResponse =
  /** status 200 OK */ BaseResponseUserViewDto;
export type GetProfileApiArg = void;
export type UpdateProfileApiResponse = /** status 200 OK */ BaseResponseVoid;
export type UpdateProfileApiArg = {
  userUpdateDto: UserUpdateDto;
};
export type DeleteProfileApiResponse = /** status 200 OK */ BaseResponseVoid;
export type DeleteProfileApiArg = void;
export type GetProfile1ApiResponse =
  /** status 200 OK */ BaseResponseUserViewDto;
export type GetProfile1ApiArg = {
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
  useConfirmEmail1Mutation,
  useConfirmEmailMutation,
  useResetPassword1Mutation,
  useResetPasswordMutation,
  useAuthenticateUserMutation,
  useCreateUserMutation,
  useSearchAdminQuery,
  useUpdateUserAdminMutation,
  useDeleteUserMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useGetProfile1Query,
  useSearchQuery,
} = injectedRtkApi;
