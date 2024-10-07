export type Pagination<PaginationObject> = {
    pageNumber: number,
    pageSize: number,
    totalPages:number,
    totalRecord:number,
    content: PaginationObject[]
}