export interface ImyPage {
  email: string
  name: string
  gender: string
  ageGroup: string
  proIntroduce: string
  preferredTags: string[]
}

export interface IProfileImg {
  imageNumber: number
  originalName: string
  size: number
  format: string
  relatedType: string
  relatedNumber: number
  path: string
  uploadDate: string
  url: string
}
export interface NewPasswordProps {
  newPassword: string
  newPasswordConfirm: string
}
