export interface IContent {
  travelNumber: number
  title: string
  summary: string
  userNumber: number
  createdAt: string
  registerDue: string
  postStatus: string
  tags: string[]
  maxPerson: number
  nowPerson: number
  userName: string
}

export interface ISort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export interface ISearchData {
  content: IContent[]
  pageable: {
    pageNumber: string
    pageSize: number
    sort: ISort
    offset: number
    paged: boolean
    unpaged: boolean
  }
  last: boolean
  totalElements: number
  totalPages: number
  first: boolean
  size: number
  sort: ISort
  numberOfElements: number
  empty: boolean
}
