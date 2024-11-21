import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '@/api/user'
import { userStore } from '@/store/client/userStore'
import useAuth from '@/hooks/user/useAuth'

const OauthGoogle = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const { setSocialLogin } = userStore()
  const { socialLogin, socialLoginMutation } = useAuth()
  const { isSuccess } = socialLoginMutation

  useEffect(() => {
    if (socialLoginMutation.isSuccess) {
      navigate('/')
    }
  }, [isSuccess])

  useEffect(() => {
    console.log(code, state, 'code')
    if (code && state) {
      getToken('google', code, state)
        .then(user => {
          console.log('user client', user)
          if (user?.userStatus === 'PENDING' && user?.userNumber) {
            navigate('/registerAge')
            setSocialLogin('google', Number(user.userNumber) as number)
          } else if (user?.userStatus === 'ABLE') {
            socialLogin({
              socialLoginId: user?.socialLoginId as string,
              email: user?.userEmail as string
            })
          } else {
            alert('소셜 로그인 과정에서 문제가 발생했습니다.')
            navigate('/login')
          }
        })
        .catch(error => {
          alert(
            error?.error
              ? error.error
              : '소셜 로그인 과정에서 문제가 발생했습니다.'
          )
          navigate('/login')
        })
    }
  }, [code, state])

  return null
}

export default OauthGoogle
