import StandardReponse from "./StandardReponse";

export default interface RangeResponse<T> extends StandardReponse {
    data: T[];
}