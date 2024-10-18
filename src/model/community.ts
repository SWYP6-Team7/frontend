export interface PostCommunity {
  categoryName: string
  title: string
  content: string
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
  profileImageUrl: string
}

export interface Image {
  imageNumber: number
  relatedType: string
  relatedNumber: number
  key: string
  url: string
  uploadDate: string
}

export interface ICommunityItem {
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
  thumbnailUrl: string
}

interface Page {
  size: number
  number: number
  totalElements: number
  totalPages: number
}

export interface ICommunityList {
  content: ICommunityItem[]
  page: Page
}
