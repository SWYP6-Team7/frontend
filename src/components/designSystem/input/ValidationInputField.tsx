import Spacing from '@/components/Spacing'
import StateInputField from './StateInputField'
import InfoText from '../text/InfoText'
import React from 'react'

interface ValidationInputFieldProps {
  type: string
  name: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  shake?: boolean
  value: string
  hasError?: boolean
  success?: boolean
  placeholder?: string
  showSuccess?: boolean
  message: string
  handleRemoveValue: () => void
}

export default function ValidationInputField({
  type,
  name,
  onChange,
  value,
  handleRemoveValue,
  hasError,
  success,
  showSuccess = false,
  placeholder,
  shake,
  message
}: ValidationInputFieldProps) {
  return (
    <>
      <StateInputField
        handleRemoveValue={handleRemoveValue}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        hasError={hasError}
        success={success}
        placeholder={placeholder}
        shake={shake}
      />
      <Spacing size={8} />
      {hasError ? (
        <InfoText hasError>{message}</InfoText>
      ) : showSuccess && success ? (
        <InfoText success>{message}</InfoText>
      ) : (
        <Spacing size={16} />
      )}
    </>
  )
}
