import {  NavigationContainerRefWithCurrent, ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { createRef } from "react";
import { AppScreens } from "../../Routes";
export default function useRouter() {
    return useNavigation<StackNavigationProp<AppScreens>>();
}