export interface ICommentPost {
  content: string
  parentNumber: number
}

export interface IComment {
  commentNumber: number
  userNumber: number
  content: string
  parentNumber: number
  regDate: string
  relatedType: string
  relatedNumber: number
  writer: string
  repliesCount: number
  likes: number
  liked: boolean
  travelWriterNumber: number
}
