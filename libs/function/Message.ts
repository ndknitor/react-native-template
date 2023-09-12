import Toast, { ToastOptions } from "react-native-root-toast";
import colors from "../../utils/colors";

const Message = {
    success: (message: string, options?: ToastOptions | undefined) => {
        Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            backgroundColor: "green",
            animation: true,
            hideOnPress: true,
            delay: 0,
            ...options
        });
    },
    info: (message: string, options?: ToastOptions | undefined) => {
        Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            backgroundColor: "#135cd1",
            animation: true,
            hideOnPress: true,
            delay: 0,
            ...options
        });
    },
    warning : (message: string, options?: ToastOptions | undefined) => {
        Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            backgroundColor: "#b8ad1d",
            animation: true,
            hideOnPress: true,
            delay: 0,
            ...options
        });
    },
    error : (message: string, options?: ToastOptions | undefined) => {
        Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            backgroundColor: "#b50000",
            animation: true,
            hideOnPress: true,
            delay: 0,
            ...options
        });
    }
};
export default Message;