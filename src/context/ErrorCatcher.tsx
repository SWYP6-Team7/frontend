import { errorStore } from '@/store/client/errorStore'
import { sendLogToSentry } from '@/utils/sentry'
import { useEffect } from 'react'

const ErrorCatcher = () => {
  const { error } = errorStore()
  console.log(error, '에러 catcher')
  useEffect(() => {
    if (!error) return
    sendLogToSentry(error)
    throw error
  }, [error])

  return <></>
}

export default ErrorCatcher
