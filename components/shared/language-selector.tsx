import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IconButton, Menu } from "react-native-paper";

import { supportedLanguages } from "@/store/i18n";

export default function LanguageSelector() {
  const { t, i18n } = useTranslation();

  const [visible, setVisible] = useState(false);

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    closeMenu();
  };

  const openMenu = () => {
    setVisible(true);
  };

  const closeMenu = () => {
    setVisible(false);
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton icon="translate" onPress={openMenu}></IconButton>}
    >
      {supportedLanguages.map((language) => (
        <Menu.Item
          key={language}
          onPress={() => handleChangeLanguage(language)}
          title={t(`language.${language}`)}
        />
      ))}
    </Menu>
  );
}
