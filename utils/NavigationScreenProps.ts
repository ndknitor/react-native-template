import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

type NavigationScreenProps<T> = StackScreenProps<ParamListBase> & { route: RouteProp<ParamListBase> & { params?: T } };


export default NavigationScreenProps;


