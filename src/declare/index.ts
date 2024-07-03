// 分页信息
export interface Pageable {
  pageNumber: number
  pageSize: number
  totalPages: number
  totalElements: number
}

export interface UniversalListRet<T> {
  content: Array<T>
  pageable: Pageable
}

export type UniversalListParams = {
  current: number
  limit: number
}
