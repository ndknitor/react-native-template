import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppScreens } from "../Routes";
export default function useRouter() {
    return useNavigation<StackNavigationProp<AppScreens>>();
}