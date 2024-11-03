import { errorStore } from '@/store/client/errorStore'
import { sendLogToSentry } from '@/utils/sentry'
import { useEffect } from 'react'

const ErrorCatcher = () => {
  const { error } = errorStore()

  useEffect(() => {
    if (!error) return
    sendLogToSentry(error)
  }, [error])

  return <></>
}

export default ErrorCatcher
