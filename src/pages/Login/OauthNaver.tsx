import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '@/api/user'
import { userStore } from '@/store/client/userStore'
import useAuth from '@/hooks/user/useAuth'

const OauthNaver = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const code = searchParams.get('code') // 네이버에서 받은 인증 코드
  const { socialLogin, socialLoginMutation } = useAuth()
  const { setSocialLogin } = userStore()
  const { isSuccess, isPending, isError } = socialLoginMutation
  useEffect(() => {
    if (socialLoginMutation.isSuccess) {
      navigate('/')
      setSocialLogin('naver')
    }
    if (socialLoginMutation.isError) {
      alert(socialLoginMutation.isError)
      navigate('/login')
    }
  }, [isSuccess, isError])

  useEffect(() => {
    if (code) {
      // 네이버 인증 코드를 이용해 서버에서 토큰을 요청

      getToken('naver', code)
        .then(user => {
          console.log('user client', user)
          socialLogin({
            socialLoginId: user?.socialLoginId as string,
            email: user?.email as string
          })
        })
        .catch(error => {
          alert(error)
          navigate('/login')
        })
    }
  }, [code])

  return null
}

export default OauthNaver