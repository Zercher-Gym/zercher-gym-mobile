import { ProgressBar } from "react-native-paper";

import { globalStyles } from "../styles/global";

const LinearProgressBar = () => {
  return <ProgressBar indeterminate={true} style={globalStyles.loadingBar} />;
};

export default LinearProgressBar;
