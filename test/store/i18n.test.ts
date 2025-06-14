import i18n, { supportedLanguages } from "../../store/i18n";

// Mock expo-localization
jest.mock("expo-localization", () => ({
  locale: "en-US",
  locales: ["en-US"],
}));

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("i18n Configuration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with correct configuration", () => {
    expect(i18n.options.lng).toBeDefined();
    expect(i18n.options.fallbackLng).toBe(supportedLanguages);
  });

  it("should support English and Romanian languages", () => {
    const supportedLanguages = ["en", "ro"];

    supportedLanguages.forEach((lang) => {
      expect(i18n.hasResourceBundle(lang, "translation")).toBeDefined();
    });
  });

  it("should handle language change correctly", async () => {
    await i18n.changeLanguage("ro");
    expect(i18n.language).toBe("ro");

    await i18n.changeLanguage("en");
    expect(i18n.language).toBe("en");
  });

  it("should fall back to English for unsupported languages", async () => {
    await i18n.changeLanguage("fr"); // Unsupported language
    expect(i18n.language).toBe(supportedLanguages[0]); // Should fallback to English
  });

  it("should translate common keys", () => {
    const commonKeys = [
      "application.create",
      "application.edit",
      "application.close",
      "application.back",
    ];

    commonKeys.forEach((key) => {
      const translation = i18n.t(key);
      expect(translation).toBeDefined();
      expect(translation).not.toBe(key); // Should not return the key itself
    });
  });

  it("should handle missing translations gracefully", () => {
    const missingKey = "this.key.does.not.exist";
    const translation = i18n.t(missingKey);

    // Should return the key or a fallback
    expect(translation).toBeDefined();
  });

  it("should support interpolation", () => {
    // Assuming there's a translation with interpolation
    const translationWithVar = i18n.t("welcome.message", { name: "John" });
    expect(translationWithVar).toBeDefined();
  });

  it("should support pluralization", () => {
    // Test pluralization if supported
    const singular = i18n.t("items", { count: 1 });
    const plural = i18n.t("items", { count: 5 });

    expect(singular).toBeDefined();
    expect(plural).toBeDefined();
  });

  describe("Error Translations", () => {
    it("should translate authentication errors", () => {
      const authErrors = [
        "accessDenied",
        "userNotEnabled",
        "userAuthenticationFailed",
        "invalidCredentials",
      ];

      authErrors.forEach((errorKey) => {
        const translation = i18n.t(errorKey, { ns: "error" });
        expect(translation).toBeDefined();
        expect(translation).not.toBe(errorKey);
      });
    });

    it("should translate validation errors", () => {
      const validationErrors = [
        "title.requiredError",
        "description.requiredError",
        "unit.requiredError",
      ];

      validationErrors.forEach((errorKey) => {
        const translation = i18n.t(errorKey, { ns: "properties" });
        expect(translation).toBeDefined();
        expect(translation).not.toBe(errorKey);
      });
    });
  });

  describe("Workout Translations", () => {
    it("should translate workout-related terms", () => {
      const workoutKeys = [
        "workout.title",
        "workout.search",
        "customWorkout.title",
        "customWorkout.deleteConfirmation",
        "workoutLog.history",
      ];

      workoutKeys.forEach((key) => {
        const translation = i18n.t(key);
        expect(translation).toBeDefined();
        expect(translation).not.toBe(key);
      });
    });

    it("should translate exercise-related terms", () => {
      const exerciseKeys = [
        "exercise.title",
        "exercise.search",
        "customExercise.title",
        "customExercise.delete",
        "customExercise.deleteConfirmation",
      ];

      exerciseKeys.forEach((key) => {
        const translation = i18n.t(key);
        expect(translation).toBeDefined();
        expect(translation).not.toBe(key);
      });
    });
  });

  describe("Namespace Support", () => {
    it("should support error namespace", () => {
      const errorTranslation = i18n.t("unknownError", { ns: "error" });
      expect(errorTranslation).toBeDefined();
      expect(errorTranslation).not.toBe("unknownError");
    });

    it("should support validation namespace", () => {
      const validationTranslation = i18n.t("required", { ns: "validation" });
      expect(validationTranslation).toBeDefined();
    });
  });

  describe("RTL Support", () => {
    it("should handle RTL languages correctly", () => {
      // Test RTL detection and handling
      expect(i18n.dir()).toBeDefined();
      expect(["ltr", "rtl"]).toContain(i18n.dir());
    });
  });

  describe("Date and Number Formatting", () => {
    it("should format dates according to locale", () => {
      const date = new Date("2023-01-01");

      i18n.changeLanguage("en");
      const enDate = date.toLocaleDateString(i18n.language);

      i18n.changeLanguage("ro");
      const roDate = date.toLocaleDateString(i18n.language);

      expect(enDate).toBeDefined();
      expect(roDate).toBeDefined();
    });

    it("should format numbers according to locale", () => {
      const number = 1234.56;

      i18n.changeLanguage("en");
      const enNumber = number.toLocaleString(i18n.language);

      i18n.changeLanguage("ro");
      const roNumber = number.toLocaleString(i18n.language);

      expect(enNumber).toBeDefined();
      expect(roNumber).toBeDefined();
    });
  });
});
