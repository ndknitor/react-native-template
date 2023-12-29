import { API_BASE_URL, REQUEST_TIMEOUT } from "@env";
import Message from "./Message";
import { createFetcker } from "fetcker";
const fetcker = createFetcker({
    baseUrl: API_BASE_URL,
    requestTimeOut: parseInt(REQUEST_TIMEOUT.toString()),
    onError: (error, isClient) => {
        let message = "";
        if (isClient) {
            switch (error.name) {
                case "TypeError": message = "Network connection error";
                    break;
                case "AbortError": message = "Request time out";
                    break;
            }
            Message.error(message);
        }
    }
});

export default fetcker;
