import { RootState } from "@/store/store";
import authenticationSlice, {
  IAuthenticationState,
  removeToken,
  selectToken,
  setToken,
} from "../../../store/slices/authenticationSlice";

describe("Authentication Slice", () => {
  const initialState = {
    token: null,
  };

  it("should return the initial state", () => {
    expect(authenticationSlice.reducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle setToken", () => {
    const testToken = "test-jwt-token-123";
    const actual = authenticationSlice.reducer(
      initialState,
      setToken(testToken)
    );

    expect(actual.token).toEqual(testToken);
  });

  it("should handle removeToken", () => {
    const stateWithToken = {
      token: "existing-token",
    };

    const actual = authenticationSlice.reducer(stateWithToken, removeToken());

    expect(actual.token).toBeNull();
  });

  it("should handle multiple token operations", () => {
    let state = initialState as IAuthenticationState;

    // Set a token
    state = authenticationSlice.reducer(state, setToken("first-token"));
    expect(state.token).toBe("first-token");

    // Replace with another token
    state = authenticationSlice.reducer(state, setToken("second-token"));
    expect(state.token).toBe("second-token");

    // Remove the token
    state = authenticationSlice.reducer(state, removeToken());
    expect(state.token).toBeNull();
  });

  it("should handle setToken with empty string", () => {
    const actual = authenticationSlice.reducer(initialState, setToken(""));
    expect(actual.token).toBe("");
  });

  it("should preserve state immutability", () => {
    const state = { token: "original-token" };
    const newState = authenticationSlice.reducer(state, setToken("new-token"));

    // Original state should not be mutated
    expect(state.token).toBe("original-token");
    expect(newState.token).toBe("new-token");
    expect(newState).not.toBe(state);
  });

  describe("Action Creators", () => {
    it("should create setToken action", () => {
      const token = "test-token";
      const expectedAction = {
        type: "authentication/setToken",
        payload: token,
      };

      expect(setToken(token)).toEqual(expectedAction);
    });

    it("should create removeToken action", () => {
      const expectedAction = {
        type: "authentication/removeToken",
        payload: undefined,
      };

      expect(removeToken()).toEqual(expectedAction);
    });
  });

  describe("Selectors", () => {
    it("should select token from state", () => {
      const state = {
        authentication: {
          token: "test-token",
        },
      };

      // If there are selectors exported, test them here
      expect(selectToken(state as RootState)).toBe("test-token");
    });

    it("should return null when no token exists", () => {
      const state = {
        authentication: {
          token: null,
        },
      };

      expect(selectToken(state as RootState)).toBeNull();
    });
  });
});
