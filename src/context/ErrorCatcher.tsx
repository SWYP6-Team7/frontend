import ErrorToast from '@/components/designSystem/toastMessage/errorToast'
import { errorStore } from '@/store/client/errorStore'
import { errorToastUI } from '@/store/client/toastUI'
import { sendLogToSentry } from '@/utils/sentry'
import { useEffect } from 'react'

const ErrorCatcher = () => {
  const { error, isMutationError } = errorStore()
  const { setErrorToastShow } = errorToastUI()
  console.log(error, isMutationError, '에러 catcher')
  useEffect(() => {
    if (!error) return
    sendLogToSentry(error)

    if (isMutationError) {
      setErrorToastShow(true)
      return
    }
    throw error
  }, [error])

  return (
    <>
      <ErrorToast />
    </>
  )
}

export default ErrorCatcher
