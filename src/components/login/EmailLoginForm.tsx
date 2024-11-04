import styled from '@emotion/styled'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Spacing from '../Spacing'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../Button'
import InfoText from '../designSystem/text/InfoText'
import useAuth from '@/hooks/user/useAuth'
import InputField from '../designSystem/input/InputField'
import { emailSchema, passwordSchema } from '@/utils/schema'

const EmailLoginForm = () => {
  const navigate = useNavigate()
  const {
    loginEmail,
    loginEmailMutation: { isError, isPending, isSuccess }
  } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [success, setSuccess] = useState({
    email: false,
    password: false
  })
  const [error, setError] = useState<undefined | string>()
  const [shake, setShake] = useState(false)

  useEffect(() => {
    if (isSuccess) {
      setFormData({ email: '', password: '' })
      navigate('/')
    }
  }, [isSuccess])

  useEffect(() => {
    if (!isPending && isError) {
      setError('로그인 정보를 다시 확인해주세요.')
      setShake(prev => (prev ? prev : true))

      setTimeout(() => {
        setShake(false)
      }, 500)
    }
  }, [isError, isPending])

  const handleRemoveValue = (name: 'email' | 'password') => {
    if (name === 'email') {
      setSuccess(prev => ({ ...prev, email: false }))
      setFormData(prev => ({ ...prev, email: '' }))
    } else {
      setSuccess(prev => ({ ...prev, password: false }))
      setFormData(prev => ({ ...prev, password: '' }))
    }
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      loginEmail(formData)

      return
    } catch (error: any) {
      setError('로그인 정보를 다시 확인해주세요.')
      setShake(prev => (prev ? prev : true))

      setTimeout(() => {
        setShake(false)
      }, 500)
      return
    }
  }

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (name === 'email') {
      const emailValidation = emailSchema.safeParse(value)
      if (!emailValidation.success) {
        setError(emailValidation.error.flatten().formErrors[0])
      } else {
        setError(undefined)
        setSuccess(prev => ({
          ...prev,
          email: emailValidation.success
        }))
      }
    } else {
      const passwordValidation = passwordSchema.safeParse(value)

      if (!passwordValidation.success) {
        setError(passwordValidation.error!.flatten().formErrors[0])
      } else {
        setError(undefined)
      }
      setSuccess(prev => ({
        ...prev,
        password: passwordValidation.success
      }))
    }
  }
  return (
    <Container onSubmit={onSubmit}>
      <InputField
        handleRemoveValue={() => handleRemoveValue('email')}
        type="email"
        value={formData.email}
        placeholder="이메일 아이디"
        name="email"
        height={54}
        showIcon={true}
        success={false}
        showSuccessIcon={false}
        onChange={changeValue}
      />
      <Spacing size={16} />
      <InputField
        showSuccessIcon={false}
        handleRemoveValue={() => handleRemoveValue('password')}
        type="password"
        height={54}
        showIcon={true}
        value={formData.password}
        placeholder="패스워드"
        name="password"
        success={false}
        onChange={changeValue}
      />
      <Spacing size={14} />
      {error ? (
        <InfoText
          shake={shake}
          hasError>
          {error}
        </InfoText>
      ) : (
        <Spacing size={16} />
      )}
      <Spacing size={24} />
      <SignUpLinkContainer>
        <span css={{ color: '#848484' }}>처음 오셨나요?</span>
        <Link
          to="/registerForm"
          css={{ textDecoration: 'underline' }}>
          회원가입
        </Link>
      </SignUpLinkContainer>
      <Spacing size={26} />

      <Button
        text="로그인"
        disabled={!(success.email && success.password)}
        type="submit"
        addStyle={
          success.email && success.password
            ? undefined
            : {
                backgroundColor: 'rgba(220, 220, 220, 1)',
                color: 'rgba(132, 132, 132, 1)',
                boxShadow: '-2px 4px 5px 0px rgba(170, 170, 170, 0.1)'
              }
        }
      />
    </Container>
  )
}

const Container = styled.form`
  padding: 0 24px;
  display: flex;
  width: 100%;
  font-size: 14px;
  flex-direction: column;
  line-height: 16px;
  letter-spacing: -0.04px;
  justify-content: center;
`
const SignUpLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  align-items: center;
`

export default EmailLoginForm
