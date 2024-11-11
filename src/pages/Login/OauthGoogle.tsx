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
          }
        })
        .catch(error => {
          alert(error)
          navigate('/login')
        })
    }
  }, [code, state])

  return null
}

export default OauthGoogle
