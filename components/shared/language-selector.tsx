import { supportedLanguages } from "@/store/i18n";
import { useTranslation } from "react-i18next";
import { SegmentedButtons } from "react-native-paper";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <SegmentedButtons
      value={i18n.language}
      onValueChange={handleChangeLanguage}
      buttons={supportedLanguages.map((language) => ({
        value: language,
        label: language.toUpperCase(),
      }))}
    />
  );
}
