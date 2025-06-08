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
    createExercise: build.mutation<
      CreateExerciseApiResponse,
      CreateExerciseApiArg
    >({
      query: (queryArg) => ({
        url: `/api/exercise/admin/create`,
        method: "POST",
        body: queryArg.exerciseCreateDto,
      }),
    }),
    updateLabel1: build.mutation<UpdateLabel1ApiResponse, UpdateLabel1ApiArg>({
      query: (queryArg) => ({
        url: `/api/exercise/admin/label/${queryArg.id}`,
        method: "PUT",
        body: queryArg.exerciseLabelUpdateDto,
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
          identifier: queryArg.identifier,
          language: queryArg.language,
          title: queryArg.title,
          description: queryArg.description,
        },
      }),
    }),
    deleteExercise: build.mutation<
      DeleteExerciseApiResponse,
      DeleteExerciseApiArg
    >({
      query: (queryArg) => ({
        url: `/api/exercise/admin/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    updateExercise: build.mutation<
      UpdateExerciseApiResponse,
      UpdateExerciseApiArg
    >({
      query: (queryArg) => ({
        url: `/api/exercise/admin/${queryArg.id}`,
        method: "PUT",
        body: queryArg.exerciseUpdateDto,
      }),
    }),
    getCustomExercises: build.query<
      GetCustomExercisesApiResponse,
      GetCustomExercisesApiArg
    >({
      query: () => ({ url: `/api/exercise/custom` }),
    }),
    deleteCustomExerciseAdmin: build.mutation<
      DeleteCustomExerciseAdminApiResponse,
      DeleteCustomExerciseAdminApiArg
    >({
      query: (queryArg) => ({
        url: `/api/exercise/custom/admin/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getCustomExercisesAdmin: build.query<
      GetCustomExercisesAdminApiResponse,
      GetCustomExercisesAdminApiArg
    >({
      query: (queryArg) => ({
        url: `/api/exercise/custom/admin/${queryArg.userId}`,
      }),
    }),
    createCustomExercise: build.mutation<
      CreateCustomExerciseApiResponse,
      CreateCustomExerciseApiArg
    >({
      query: (queryArg) => ({
        url: `/api/exercise/custom/create`,
        method: "POST",
        body: queryArg.customExerciseCreateDto,
      }),
    }),
    deleteCustomExercise: build.mutation<
      DeleteCustomExerciseApiResponse,
      DeleteCustomExerciseApiArg
    >({
      query: (queryArg) => ({
        url: `/api/exercise/custom/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    updateCustomExercise: build.mutation<
      UpdateCustomExerciseApiResponse,
      UpdateCustomExerciseApiArg
    >({
      query: (queryArg) => ({
        url: `/api/exercise/custom/${queryArg.id}`,
        method: "PUT",
        body: queryArg.customExerciseUpdateDto,
      }),
    }),
    searchExercise: build.query<
      SearchExerciseApiResponse,
      SearchExerciseApiArg
    >({
      query: (queryArg) => ({
        url: `/api/exercise/search`,
        params: {
          contains: queryArg.contains,
          limit: queryArg.limit,
        },
      }),
    }),
    getExercise: build.query<GetExerciseApiResponse, GetExerciseApiArg>({
      query: (queryArg) => ({ url: `/api/exercise/${queryArg.id}` }),
    }),
    getRoleLimit: build.query<GetRoleLimitApiResponse, GetRoleLimitApiArg>({
      query: () => ({ url: `/api/role/admin/limit` }),
    }),
    updateRoleLimit: build.mutation<
      UpdateRoleLimitApiResponse,
      UpdateRoleLimitApiArg
    >({
      query: (queryArg) => ({
        url: `/api/role/admin/limit/${queryArg.roleId}`,
        method: "PUT",
        body: queryArg.roleLimitUpdateDto,
      }),
    }),
    getUnits: build.query<GetUnitsApiResponse, GetUnitsApiArg>({
      query: (queryArg) => ({
        url: `/api/unit`,
        params: {
          page: queryArg.page,
          size: queryArg.size,
          sort: queryArg.sort,
        },
      }),
    }),
    createUnit: build.mutation<CreateUnitApiResponse, CreateUnitApiArg>({
      query: (queryArg) => ({
        url: `/api/unit/admin/create`,
        method: "POST",
        body: queryArg.unitCreateUpdateDto,
      }),
    }),
    deleteUnit: build.mutation<DeleteUnitApiResponse, DeleteUnitApiArg>({
      query: (queryArg) => ({
        url: `/api/unit/admin/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    updateUnit: build.mutation<UpdateUnitApiResponse, UpdateUnitApiArg>({
      query: (queryArg) => ({
        url: `/api/unit/admin/${queryArg.id}`,
        method: "PUT",
        body: queryArg.unitCreateUpdateDto,
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
    createWorkout: build.mutation<
      CreateWorkoutApiResponse,
      CreateWorkoutApiArg
    >({
      query: (queryArg) => ({
        url: `/api/workout/admin/create`,
        method: "POST",
        body: queryArg.workoutCreateDto,
      }),
    }),
    updateLabel: build.mutation<UpdateLabelApiResponse, UpdateLabelApiArg>({
      query: (queryArg) => ({
        url: `/api/workout/admin/label/${queryArg.id}`,
        method: "PUT",
        body: queryArg.workoutLabelUpdateDto,
      }),
    }),
    searchWorkoutAdmin: build.query<
      SearchWorkoutAdminApiResponse,
      SearchWorkoutAdminApiArg
    >({
      query: (queryArg) => ({
        url: `/api/workout/admin/search`,
        params: {
          page: queryArg.page,
          size: queryArg.size,
          sort: queryArg.sort,
          searchAdminDTO: queryArg.searchAdminDto,
        },
      }),
    }),
    deleteWorkout: build.mutation<
      DeleteWorkoutApiResponse,
      DeleteWorkoutApiArg
    >({
      query: (queryArg) => ({
        url: `/api/workout/admin/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    updateWorkout: build.mutation<
      UpdateWorkoutApiResponse,
      UpdateWorkoutApiArg
    >({
      query: (queryArg) => ({
        url: `/api/workout/admin/${queryArg.id}`,
        method: "PUT",
        body: queryArg.workoutUpdateDto,
      }),
    }),
    getCustomWorkouts: build.query<
      GetCustomWorkoutsApiResponse,
      GetCustomWorkoutsApiArg
    >({
      query: () => ({ url: `/api/workout/custom` }),
    }),
    deleteCustomWorkoutAdmin: build.mutation<
      DeleteCustomWorkoutAdminApiResponse,
      DeleteCustomWorkoutAdminApiArg
    >({
      query: (queryArg) => ({
        url: `/api/workout/custom/admin/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getCustomWorkoutAdmin: build.query<
      GetCustomWorkoutAdminApiResponse,
      GetCustomWorkoutAdminApiArg
    >({
      query: (queryArg) => ({
        url: `/api/workout/custom/admin/${queryArg.id}`,
      }),
    }),
    getCustomWorkoutsByAdmin: build.query<
      GetCustomWorkoutsByAdminApiResponse,
      GetCustomWorkoutsByAdminApiArg
    >({
      query: (queryArg) => ({
        url: `/api/workout/custom/admin/${queryArg.userId}`,
      }),
    }),
    createCustomWorkout: build.mutation<
      CreateCustomWorkoutApiResponse,
      CreateCustomWorkoutApiArg
    >({
      query: (queryArg) => ({
        url: `/api/workout/custom/create`,
        method: "POST",
        body: queryArg.customWorkoutCreateUpdateDto,
      }),
    }),
    deleteCustomWorkout: build.mutation<
      DeleteCustomWorkoutApiResponse,
      DeleteCustomWorkoutApiArg
    >({
      query: (queryArg) => ({
        url: `/api/workout/custom/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getCustomWorkout: build.query<
      GetCustomWorkoutApiResponse,
      GetCustomWorkoutApiArg
    >({
      query: (queryArg) => ({ url: `/api/workout/custom/${queryArg.id}` }),
    }),
    updateCustomWorkout: build.mutation<
      UpdateCustomWorkoutApiResponse,
      UpdateCustomWorkoutApiArg
    >({
      query: (queryArg) => ({
        url: `/api/workout/custom/${queryArg.id}`,
        method: "PUT",
        body: queryArg.customWorkoutCreateUpdateDto,
      }),
    }),
    searchWorkout: build.query<SearchWorkoutApiResponse, SearchWorkoutApiArg>({
      query: (queryArg) => ({
        url: `/api/workout/search`,
        params: {
          searchDTO: queryArg.searchDto,
        },
      }),
    }),
    getWorkout: build.query<GetWorkoutApiResponse, GetWorkoutApiArg>({
      query: (queryArg) => ({ url: `/api/workout/${queryArg.id}` }),
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
export type CreateExerciseApiResponse = /** status 200 OK */ BaseResponseVoid;
export type CreateExerciseApiArg = {
  exerciseCreateDto: ExerciseCreateDto;
};
export type UpdateLabel1ApiResponse = /** status 200 OK */ BaseResponseVoid;
export type UpdateLabel1ApiArg = {
  id: number;
  exerciseLabelUpdateDto: ExerciseLabelUpdateDto;
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
  identifier?: string;
  language?: "ro" | "en";
  title?: string;
  description?: string;
};
export type DeleteExerciseApiResponse = /** status 200 OK */ BaseResponseVoid;
export type DeleteExerciseApiArg = {
  id: string;
};
export type UpdateExerciseApiResponse = /** status 200 OK */ BaseResponseVoid;
export type UpdateExerciseApiArg = {
  id: string;
  exerciseUpdateDto: ExerciseUpdateDto;
};
export type GetCustomExercisesApiResponse =
  /** status 200 OK */ BaseResponseListCustomExerciseViewDto;
export type GetCustomExercisesApiArg = void;
export type DeleteCustomExerciseAdminApiResponse =
  /** status 200 OK */ BaseResponseVoid;
export type DeleteCustomExerciseAdminApiArg = {
  id: string;
};
export type GetCustomExercisesAdminApiResponse =
  /** status 200 OK */ BaseResponseListCustomExerciseViewDto;
export type GetCustomExercisesAdminApiArg = {
  userId: string;
};
export type CreateCustomExerciseApiResponse =
  /** status 200 OK */ BaseResponseVoid;
export type CreateCustomExerciseApiArg = {
  customExerciseCreateDto: CustomExerciseCreateDto;
};
export type DeleteCustomExerciseApiResponse =
  /** status 200 OK */ BaseResponseVoid;
export type DeleteCustomExerciseApiArg = {
  id: string;
};
export type UpdateCustomExerciseApiResponse =
  /** status 200 OK */ BaseResponseVoid;
export type UpdateCustomExerciseApiArg = {
  id: string;
  customExerciseUpdateDto: CustomExerciseUpdateDto;
};
export type SearchExerciseApiResponse =
  /** status 200 OK */ BaseResponseListExerciseViewDto;
export type SearchExerciseApiArg = {
  contains?: string;
  limit: number;
};
export type GetExerciseApiResponse =
  /** status 200 OK */ BaseResponseExerciseViewAdminDto;
export type GetExerciseApiArg = {
  id: string;
};
export type GetRoleLimitApiResponse = /** status 200 OK */ RoleLimitViewDto[];
export type GetRoleLimitApiArg = void;
export type UpdateRoleLimitApiResponse = /** status 200 OK */ BaseResponseVoid;
export type UpdateRoleLimitApiArg = {
  roleId: number;
  roleLimitUpdateDto: RoleLimitUpdateDto;
};
export type GetUnitsApiResponse =
  /** status 200 OK */ BaseResponseListUnitViewDto;
export type GetUnitsApiArg = {
  /** Zero-based page index (0..N) */
  page?: number;
  /** The size of the page to be returned */
  size?: number;
  /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
  sort?: string[];
};
export type CreateUnitApiResponse = /** status 200 OK */ BaseResponseVoid;
export type CreateUnitApiArg = {
  unitCreateUpdateDto: UnitCreateUpdateDto;
};
export type DeleteUnitApiResponse = /** status 200 OK */ BaseResponseVoid;
export type DeleteUnitApiArg = {
  id: number;
};
export type UpdateUnitApiResponse = /** status 200 OK */ BaseResponseVoid;
export type UpdateUnitApiArg = {
  id: number;
  unitCreateUpdateDto: UnitCreateUpdateDto;
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
export type CreateWorkoutApiResponse = /** status 200 OK */ BaseResponseVoid;
export type CreateWorkoutApiArg = {
  workoutCreateDto: WorkoutCreateDto;
};
export type UpdateLabelApiResponse = /** status 200 OK */ BaseResponseVoid;
export type UpdateLabelApiArg = {
  id: number;
  workoutLabelUpdateDto: WorkoutLabelUpdateDto;
};
export type SearchWorkoutAdminApiResponse =
  /** status 200 OK */ PageResponseWorkoutViewListDto;
export type SearchWorkoutAdminApiArg = {
  /** Zero-based page index (0..N) */
  page?: number;
  /** The size of the page to be returned */
  size?: number;
  /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
  sort?: string[];
  searchAdminDto: WorkoutSearchAdminDto;
};
export type DeleteWorkoutApiResponse = /** status 200 OK */ BaseResponseVoid;
export type DeleteWorkoutApiArg = {
  id: string;
};
export type UpdateWorkoutApiResponse = /** status 200 OK */ BaseResponseVoid;
export type UpdateWorkoutApiArg = {
  id: string;
  workoutUpdateDto: WorkoutUpdateDto;
};
export type GetCustomWorkoutsApiResponse =
  /** status 200 OK */ BaseResponseListCustomWorkoutViewListDto;
export type GetCustomWorkoutsApiArg = void;
export type DeleteCustomWorkoutAdminApiResponse =
  /** status 200 OK */ BaseResponseVoid;
export type DeleteCustomWorkoutAdminApiArg = {
  id: string;
};
export type GetCustomWorkoutAdminApiResponse =
  /** status 200 OK */ BaseResponseCustomWorkoutViewDto;
export type GetCustomWorkoutAdminApiArg = {
  id: string;
};
export type GetCustomWorkoutsByAdminApiResponse =
  /** status 200 OK */ BaseResponseListCustomWorkoutViewListDto;
export type GetCustomWorkoutsByAdminApiArg = {
  userId: string;
};
export type CreateCustomWorkoutApiResponse =
  /** status 200 OK */ BaseResponseVoid;
export type CreateCustomWorkoutApiArg = {
  customWorkoutCreateUpdateDto: CustomWorkoutCreateUpdateDto;
};
export type DeleteCustomWorkoutApiResponse =
  /** status 200 OK */ BaseResponseVoid;
export type DeleteCustomWorkoutApiArg = {
  id: string;
};
export type GetCustomWorkoutApiResponse =
  /** status 200 OK */ BaseResponseCustomWorkoutViewDto;
export type GetCustomWorkoutApiArg = {
  id: string;
};
export type UpdateCustomWorkoutApiResponse =
  /** status 200 OK */ BaseResponseVoid;
export type UpdateCustomWorkoutApiArg = {
  id: string;
  customWorkoutCreateUpdateDto: CustomWorkoutCreateUpdateDto;
};
export type SearchWorkoutApiResponse =
  /** status 200 OK */ BaseResponseListWorkoutViewListDto;
export type SearchWorkoutApiArg = {
  searchDto: WorkoutSearchDto;
};
export type GetWorkoutApiResponse =
  /** status 200 OK */ BaseResponseWorkoutViewDto;
export type GetWorkoutApiArg = {
  id: string;
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
export type ExerciseLabelCreateDto = {
  description?: string;
  language: "ro" | "en";
  title?: string;
};
export type ExerciseCreateDto = {
  identifier?: string;
  labels: ExerciseLabelCreateDto[];
  units: number[];
};
export type ExerciseLabelUpdateDto = {
  description?: string;
  title?: string;
};
export type ExerciseLabelViewAdminDto = {
  description?: string;
  id: number;
  language: "ro" | "en";
  title?: string;
};
export type UnitViewDto = {
  code?: string;
  id: number;
  type: "GROUP" | "DISTANCE" | "TIME";
};
export type ExerciseViewAdminDto = {
  id: string;
  identifier?: string;
  labels: ExerciseLabelViewAdminDto[];
  units: UnitViewDto[];
};
export type PageResponseExerciseViewAdminDto = {
  data?: ExerciseViewAdminDto[];
  error?: string;
  pageNumber?: number;
  pageSize?: number;
  success?: boolean;
  totalElements?: number;
};
export type ExerciseUpdateDto = {
  identifier?: string;
  units: number[];
};
export type CustomExerciseViewDto = {
  description?: string;
  id: string;
  title?: string;
  unit: UnitViewDto;
};
export type BaseResponseListCustomExerciseViewDto = {
  data?: CustomExerciseViewDto[];
  error?: string;
  success?: boolean;
};
export type CustomExerciseCreateDto = {
  description?: string;
  title?: string;
  unitId: number;
};
export type CustomExerciseUpdateDto = {
  description?: string;
  title?: string;
  unitId: number;
};
export type ExerciseLabelViewDto = {
  description?: string;
  title?: string;
};
export type ExerciseViewDto = {
  id: string;
  identifier?: string;
  labels: {
    [key: string]: ExerciseLabelViewDto;
  };
  units: UnitViewDto[];
};
export type BaseResponseListExerciseViewDto = {
  data?: ExerciseViewDto[];
  error?: string;
  success?: boolean;
};
export type BaseResponseExerciseViewAdminDto = {
  data?: ExerciseViewAdminDto;
  error?: string;
  success?: boolean;
};
export type RoleLimitViewDto = {
  exerciseLimit?: number;
  id: number;
  name?: string;
  workoutLimit?: number;
};
export type RoleLimitUpdateDto = {
  exerciseLimit: number;
  workoutLimit: number;
};
export type BaseResponseListUnitViewDto = {
  data?: UnitViewDto[];
  error?: string;
  success?: boolean;
};
export type UnitCreateUpdateDto = {
  code?: string;
  type: "GROUP" | "DISTANCE" | "TIME";
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
export type WorkoutExerciseCreateUpdateDto = {
  exerciseId: string;
  quantity: number;
  unitId: number;
};
export type WorkoutLabelCreateDto = {
  description?: string;
  language: "ro" | "en";
  title?: string;
};
export type WorkoutCreateDto = {
  exercises: WorkoutExerciseCreateUpdateDto[];
  identifier?: string;
  labels: WorkoutLabelCreateDto[];
};
export type WorkoutLabelUpdateDto = {
  description?: string;
  title?: string;
};
export type WorkoutLabelViewDto = {
  description?: string;
  title?: string;
};
export type WorkoutViewListDto = {
  id: string;
  identifier?: string;
  labels: {
    [key: string]: WorkoutLabelViewDto;
  };
};
export type PageResponseWorkoutViewListDto = {
  data?: WorkoutViewListDto[];
  error?: string;
  pageNumber?: number;
  pageSize?: number;
  success?: boolean;
  totalElements?: number;
};
export type WorkoutSearchAdminDto = {
  description?: string;
  identifier?: string;
  language?: "ro" | "en";
  title?: string;
};
export type WorkoutUpdateDto = {
  exercises: WorkoutExerciseCreateUpdateDto[];
  identifier?: string;
};
export type CustomWorkoutViewListDto = {
  description?: string;
  id: string;
  title?: string;
};
export type BaseResponseListCustomWorkoutViewListDto = {
  data?: CustomWorkoutViewListDto[];
  error?: string;
  success?: boolean;
};
export type CustomWorkoutCustomExerciseViewDto = {
  customExerciseId: string;
  description?: string;
  id: number;
  quantity: number;
  title?: string;
  unit: UnitViewDto;
};
export type CustomWorkoutExerciseViewDto = {
  exerciseId: string;
  id: number;
  identifier?: string;
  labels: {
    [key: string]: ExerciseLabelViewDto;
  };
  quantity: number;
  unit: UnitViewDto;
  units: UnitViewDto[];
};
export type CustomWorkoutViewDto = {
  customExercises: CustomWorkoutCustomExerciseViewDto[];
  description?: string;
  exercises: CustomWorkoutExerciseViewDto[];
  title?: string;
};
export type BaseResponseCustomWorkoutViewDto = {
  data?: CustomWorkoutViewDto;
  error?: string;
  success?: boolean;
};
export type CustomWorkoutCustomExerciseCreateUpdateDto = {
  customExerciseId: string;
  quantity: number;
  unitId: number;
};
export type CustomWorkoutExerciseCreateUpdateDto = {
  exerciseId: string;
  quantity: number;
  unitId: number;
};
export type CustomWorkoutCreateUpdateDto = {
  customExercises: CustomWorkoutCustomExerciseCreateUpdateDto[];
  description?: string;
  exercises: CustomWorkoutExerciseCreateUpdateDto[];
  title?: string;
};
export type BaseResponseListWorkoutViewListDto = {
  data?: WorkoutViewListDto[];
  error?: string;
  success?: boolean;
};
export type WorkoutSearchDto = {
  contains?: string;
  limit: number;
};
export type WorkoutExerciseViewDto = {
  exerciseId: string;
  id: number;
  identifier?: string;
  labels: {
    [key: string]: ExerciseLabelViewDto;
  };
  quantity: number;
  unit: UnitViewDto;
};
export type WorkoutViewDto = {
  exercises: WorkoutExerciseViewDto[];
  identifier?: string;
  labels: {
    [key: string]: WorkoutLabelViewDto;
  };
};
export type BaseResponseWorkoutViewDto = {
  data?: WorkoutViewDto;
  error?: string;
  success?: boolean;
};
export const {
  useAuthenticateUserAdminMutation,
  useConfirmEmailSendMutation,
  useConfirmEmailMutation,
  useResetPasswordSendMutation,
  useResetPasswordMutation,
  useAuthenticateUserMutation,
  useCreateUserMutation,
  useCreateExerciseMutation,
  useUpdateLabel1Mutation,
  useSearchExerciseAdminQuery,
  useLazySearchExerciseAdminQuery,
  useDeleteExerciseMutation,
  useUpdateExerciseMutation,
  useGetCustomExercisesQuery,
  useLazyGetCustomExercisesQuery,
  useDeleteCustomExerciseAdminMutation,
  useGetCustomExercisesAdminQuery,
  useLazyGetCustomExercisesAdminQuery,
  useCreateCustomExerciseMutation,
  useDeleteCustomExerciseMutation,
  useUpdateCustomExerciseMutation,
  useSearchExerciseQuery,
  useLazySearchExerciseQuery,
  useGetExerciseQuery,
  useLazyGetExerciseQuery,
  useGetRoleLimitQuery,
  useLazyGetRoleLimitQuery,
  useUpdateRoleLimitMutation,
  useGetUnitsQuery,
  useLazyGetUnitsQuery,
  useCreateUnitMutation,
  useDeleteUnitMutation,
  useUpdateUnitMutation,
  useSearchAdminQuery,
  useLazySearchAdminQuery,
  useDeleteProfileMutation,
  useUpdateUserAdminMutation,
  useDeleteProfileCurrentMutation,
  useGetProfileCurrentQuery,
  useLazyGetProfileCurrentQuery,
  useUpdateProfileMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useSearchQuery,
  useLazySearchQuery,
  useCreateWorkoutMutation,
  useUpdateLabelMutation,
  useSearchWorkoutAdminQuery,
  useLazySearchWorkoutAdminQuery,
  useDeleteWorkoutMutation,
  useUpdateWorkoutMutation,
  useGetCustomWorkoutsQuery,
  useLazyGetCustomWorkoutsQuery,
  useDeleteCustomWorkoutAdminMutation,
  useGetCustomWorkoutAdminQuery,
  useLazyGetCustomWorkoutAdminQuery,
  useGetCustomWorkoutsByAdminQuery,
  useLazyGetCustomWorkoutsByAdminQuery,
  useCreateCustomWorkoutMutation,
  useDeleteCustomWorkoutMutation,
  useGetCustomWorkoutQuery,
  useLazyGetCustomWorkoutQuery,
  useUpdateCustomWorkoutMutation,
  useSearchWorkoutQuery,
  useLazySearchWorkoutQuery,
  useGetWorkoutQuery,
  useLazyGetWorkoutQuery,
} = injectedRtkApi;
