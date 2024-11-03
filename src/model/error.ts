export type RequestErrorType = Error & {
  status: number
  endpoint: string
  errorCode: string
  message: string
}
