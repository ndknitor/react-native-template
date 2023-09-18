export default interface PagingRequest {
    desc: boolean[];
    orderBy: string[];
    page: number;
    pageSize: number;
}