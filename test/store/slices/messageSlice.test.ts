import messageSlice, { clearMessage, setMessage } from "../../../store/slices/messageSlice";

describe("Message Slice", () => {
  const initialState = {
    data: null,
    type: null,
  };

  it("should return the initial state", () => {
    expect(messageSlice.reducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle setMessage with code type", () => {
    const message = {
      data: "validation.required",
      type: "code" as const,
    };

    const actual = messageSlice.reducer(initialState, setMessage(message));

    expect(actual.data).toBe("validation.required");
    expect(actual.type).toBe("code");
  });

  it("should handle setMessage with string type", () => {
    const message = {
      data: "Custom error message",
      type: "string" as const,
    };

    const actual = messageSlice.reducer(initialState, setMessage(message));

    expect(actual.data).toBe("Custom error message");
    expect(actual.type).toBe("string");
  });

  it("should handle setMessage with payload type", () => {
    const message = {
      data: {
        data: {
          error: "auth.invalidCredentials",
        },
        status: 401,
      },
      type: "payload" as const,
    };

    const actual = messageSlice.reducer(initialState, setMessage(message));

    expect(actual.data).toEqual(message.data);
    expect(actual.type).toBe("payload");
  });

  it("should handle clearMessage", () => {
    const stateWithMessage = {
      data: "Some error message",
      type: "string" as const,
    };

    const actual = messageSlice.reducer(stateWithMessage, clearMessage());

    expect(actual.data).toBeNull();
    expect(actual.type).toBeNull();
  });

  it("should handle setMessage with null values", () => {
    const message = {
      data: null,
      type: null,
    };

    const actual = messageSlice.reducer(initialState, setMessage(message));

    expect(actual.data).toBeNull();
    expect(actual.type).toBeNull();
  });

  it("should overwrite existing message", () => {
    const stateWithMessage = {
      data: "Old message",
      type: "string" as const,
    };

    const newMessage = {
      data: "New message",
      type: "code" as const,
    };

    const actual = messageSlice.reducer(
      stateWithMessage,
      setMessage(newMessage)
    );

    expect(actual.data).toBe("New message");
    expect(actual.type).toBe("code");
  });

  it("should preserve state immutability", () => {
    const state = { data: "original", type: "string" as const };
    const newMessage = { data: "new", type: "code" as const };
    const newState = messageSlice.reducer(state, setMessage(newMessage));

    // Original state should not be mutated
    expect(state.data).toBe("original");
    expect(state.type).toBe("string");
    expect(newState).not.toBe(state);
  });

  describe("Action Creators", () => {
    it("should create setMessage action", () => {
      const message = {
        data: "test message",
        type: "string" as const,
      };

      const expectedAction = {
        type: "message/setMessage",
        payload: message,
      };

      expect(setMessage(message)).toEqual(expectedAction);
    });

    it("should create clearMessage action", () => {
      const expectedAction = {
        type: "message/clearMessage",
        payload: undefined,
      };

      expect(clearMessage()).toEqual(expectedAction);
    });
  });

  describe("Message Types", () => {
    it("should handle all valid message types", () => {
      const messageTypes = ["code", "string", "payload"] as const;

      messageTypes.forEach((type) => {
        const message = {
          data: `test-${type}`,
          type,
        };

        const actual = messageSlice.reducer(initialState, setMessage(message));
        expect(actual.type).toBe(type);
        expect(actual.data).toBe(`test-${type}`);
      });
    });
  });

  describe("Complex Payload Handling", () => {
    it("should handle complex API error payloads", () => {
      const apiErrorPayload = {
        data: {
          data: {
            error: "auth.invalidCredentials",
            details: "Username or password is incorrect",
          },
          status: 401,
          headers: {},
        },
        type: "payload" as const,
      };

      const actual = messageSlice.reducer(
        initialState,
        setMessage(apiErrorPayload)
      );

      expect(actual.data).toEqual(apiErrorPayload.data);
      expect(actual.type).toBe("payload");
    });

    it("should handle network error payloads", () => {
      const networkError = {
        data: {
          message: "Network request failed",
          code: "NETWORK_ERROR",
        },
        type: "payload" as const,
      };

      const actual = messageSlice.reducer(
        initialState,
        setMessage(networkError)
      );

      expect(actual.data).toEqual(networkError.data);
      expect(actual.type).toBe("payload");
    });
  });
});
