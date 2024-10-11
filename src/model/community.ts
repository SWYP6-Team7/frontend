export interface PostCommunity {
  categoryName: string
  title: string
  content: string
  files: string[]
}

export interface Community {
  postNumber: number
  userNumber: number
  postWriter: string
  categoryNumber: number
  categoryName: string
  title: string
  content: string
  regDate: string
  commentCount: number
  viewCount: number
  likeCount: number
  liked: boolean
  postImageUrls: string[]
  profileImageUrl: string
}
