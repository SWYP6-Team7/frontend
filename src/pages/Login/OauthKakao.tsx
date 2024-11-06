import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '@/api/user'
import { userStore } from '@/store/client/userStore'
import useAuth from '@/hooks/user/useAuth'

const OauthKakao = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const code = searchParams.get('code') // 카카오에서 받은 인증 코드
  const state = searchParams.get('state')
  const { setSocialLogin } = userStore()
  const { socialLogin, socialLoginMutation } = useAuth()
  const { isError, isSuccess } = socialLoginMutation

  useEffect(() => {
    if (socialLoginMutation.isSuccess) {
      navigate('/')
    }
    if (socialLoginMutation.isError) {
      alert(socialLoginMutation.isError)
      navigate('/login')
    }
  }, [isSuccess, isError])

  useEffect(() => {
    if (code) {
      // 카카오 인증 코드를 이용해 서버에서 토큰을 요청

      getToken('kakao', code)
        .then(user => {
          console.log('user client', user)
          if (user?.userStatus === 'PENDING') {
            navigate('/registerForm')
            setSocialLogin('kakao')
          } else {
            socialLogin({
              socialLoginId: user?.socialLoginId as string,
              email: user?.userEmail as string
            })
          }
        })
        .catch(error => {
          alert(error)
          navigate('/login')
        })
    }
  }, [code])

  return null
}

export default OauthKakao
