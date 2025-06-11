import "react-native-gesture-handler/jestSetup";

Object.defineProperty(window, "location", {
  writable: true,
  value: { search: "" },
});

// Mock react-native modules
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock react-navigation
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    canGoBack: jest.fn(() => true),
    dispatch: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

// Mock expo modules
jest.mock("expo-localization", () => ({
  locale: "en-US",
  locales: ["en-US"],
  timezone: "America/New_York",
  isoCurrencyCodes: ["USD"],
  region: "US",
  isRTL: false,
}));

jest.mock("expo-font", () => ({
  loadAsync: jest.fn(),
}));

jest.mock("expo-constants", () => ({
  default: {
    expoConfig: {
      name: "Zercher Gym",
      slug: "zercher-gym-mobile",
    },
  },
}));

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// Mock react-native-paper Portal
jest.mock("react-native-paper", () => {
  const RealModule = jest.requireActual("react-native-paper");
  return {
    ...RealModule,
    Portal: (...children) => children,
  };
});

// Mock i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key, options) => {
      if (options && options.ns) {
        return `${options.ns}:${key}`;
      }
      return key;
    },
    i18n: {
      language: "en",
      changeLanguage: jest.fn(),
    },
  }),
  initReactI18next: {
    type: "3rdParty",
    init: jest.fn(),
  },
}));

// Mock Keyboard
jest.mock("react-native/Libraries/Components/Keyboard/Keyboard", () => ({
  dismiss: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

// Silence the warning: Animated: `useNativeDriver` is not supported
// jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
