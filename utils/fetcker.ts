import { API_BASE_URL, REQUEST_TIMEOUT } from "../env";
import Message from "./Message";
import { createFetcker } from "fetcker";
const fetcker = createFetcker({
    baseUrl: API_BASE_URL,
    requestTimeOut: parseInt(REQUEST_TIMEOUT),
    onError: (error) => {
        let message = "";
        switch (error.name) {
            case "TypeError": message = "Network connection error";
                break;
            case "AbortError": message = "Request time out";
                break;
        }
        Message.error(message);
        console.log(error);
    }
});

export default fetcker;
