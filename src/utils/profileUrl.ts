export const defaultProfileImages = [
  'defaultProfile.png',
  'defaultProfile2.png',
  'defaultProfile3.png',
  'defaultProfile4.png',
  'defaultProfile5.png',
  'defaultProfile6.png'
]
export const isDefaultProfile = (url: string) => {
  return defaultProfileImages.filter(name => url.includes(name)) // 프로필 파일이 기본 이미지 인지
}
