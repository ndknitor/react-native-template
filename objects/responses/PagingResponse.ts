import RangeResponse from "./RangeResponse";

export interface PagingResponse<T> extends RangeResponse<T> {
    maxPage: number;
    total: number;
}