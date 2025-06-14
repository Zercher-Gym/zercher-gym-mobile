import { ProgressBar } from "react-native-paper";

import { StyleProp, View, ViewStyle } from "react-native";
import { globalStyles } from "../styles/global";

export interface ILinearProgressBarProps {
  style?: StyleProp<ViewStyle>;
}

const LinearProgressBar = (props: ILinearProgressBarProps) => {
  return (
    <View style={props.style}>
      <ProgressBar indeterminate={true} style={globalStyles.loadingBar} />
    </View>
  );
};

export default LinearProgressBar;
