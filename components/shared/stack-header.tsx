import { getHeaderTitle } from "@react-navigation/elements";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import { Appbar, AppbarProps, SearchbarProps } from "react-native-paper";
import LanguageSelector from "./language-selector";

interface StackHeaderProps extends AppbarProps {
  navProps: NativeStackHeaderProps;
  showBack?: boolean;
  searchBarProps?: SearchbarProps;
  showLanguageSelector?: boolean;
}

const StackHeader = (props: StackHeaderProps) => {
  return (
    <Appbar.Header {...props}>
      {props.navProps.options.headerLeft
        ? props.navProps.options.headerLeft({
            canGoBack: props.navProps.navigation.canGoBack(),
          })
        : undefined}

      {props.showBack && props.navProps.back ? (
        <Appbar.BackAction onPress={props.navProps.navigation.goBack} />
      ) : null}

      <Appbar.Content
        title={getHeaderTitle(
          props.navProps.options,
          props.navProps.route.name
        )}
      />

      {props.showLanguageSelector ? <LanguageSelector /> : null}

      {props.navProps.options.headerRight
        ? props.navProps.options.headerRight({
            canGoBack: props.navProps.navigation.canGoBack(),
          })
        : undefined}
    </Appbar.Header>
  );
};

export default StackHeader;
