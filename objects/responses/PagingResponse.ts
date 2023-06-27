import StandardReponse from "./StandardReponse";

export interface PagingResponse<T> extends StandardReponse {
    data: T[];
    maxPage: number;
    totalRecord: number;
}