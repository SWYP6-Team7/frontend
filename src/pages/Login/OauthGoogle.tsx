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
      getToken('google', code)
        .then(user => {
          console.log('user client', user)
          if (user?.userStatus === 'PENDING') {
            navigate('/registerGender')
            setSocialLogin('google')
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

export default OauthGoogle
