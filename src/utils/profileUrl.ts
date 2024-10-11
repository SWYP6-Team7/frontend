export const defaultProfileImages = [
  'defaultProfile.png',
  'defaultProfile2.png',
  'defaultProfile3.png',
  'defaultProfile4.png',
  'defaultProfile5.png',
  'defaultProfile6.png'
]
export const isDefaultProfile = (url: string) => {
  return defaultProfileImages.some(name => url.includes(name))
}
