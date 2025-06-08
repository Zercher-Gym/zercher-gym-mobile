import { useLocalSearchParams } from "expo-router";
import AddWorkoutPage from "../add";

const CustomWorkoutEditPage = () => {
  const { id } = useLocalSearchParams();

  return AddWorkoutPage({ customWorkoutId: id.toString() });
};

export default CustomWorkoutEditPage;
