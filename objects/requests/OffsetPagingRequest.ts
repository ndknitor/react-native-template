import { MAXPAGE } from "../../env";
export default class OffsetPagingRequest<T> {
    orderBy: Array<keyof T> = [];
    desc: boolean[] = [];
    page: number = 1;
    size: number = 0;

    constructor(self: OffsetPagingRequest<T>) {
        if (self.page && Boolean(parseInt(self.page.toString())) && self.page > 0) {
            this.page = self.page;
        }
        else {
            this.page = 1;
        }
        if (self.size && Boolean(parseInt(self.size.toString()))) {
            this.size = self.size;
        }
        else {
            this.size = parseInt(MAXPAGE);
        }
    }
}