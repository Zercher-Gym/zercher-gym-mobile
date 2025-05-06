import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/main";
import ro from "./locales/ro/main";

export const supportedLanguages = ["ro", "en"];

i18n
  .use(detector)
  .use(backend)
  .use(initReactI18next)
  .init({
    defaultNS: "common",
    fallbackLng: supportedLanguages,
    supportedLngs: supportedLanguages,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: en,
      ro: ro,
    },
  });
