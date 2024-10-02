interface Travel {
  travelNumber: number
  title: string
  userNumber: number
  userName: string
  tags: string[]
  nowPerson: number
  maxPerson: number
  createdAt: string
  registerDue: string
}

interface Page {
  size: number
  number: number
  totalElements: number
  totalPages: number
}

export interface ITripList {
  content: Travel[]
  page: Page
}
