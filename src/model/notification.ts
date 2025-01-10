export interface INotificationContent {
  title: string
  createdAt: string
  content: string
  isRead: boolean
  travelNumber?: number
  travelHostUser?: boolean
  travelTitle?: string
  travelDueDate?: string
}

export interface INotification {
  content: INotificationContent[]
  page: {
    size: number
    number: number
    totalElements: number
    totalPages: number
  }
}
