import StandardReponse from "./StandardReponse";

export default interface SingleResponse<T> extends StandardReponse {
    data: T;
}