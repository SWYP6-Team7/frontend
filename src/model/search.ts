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

  page: {
    size: number
    number: number
    totalElements: number
    totalPages: number
  }
}
