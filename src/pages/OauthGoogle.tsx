import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '@/api/user'

const OauthGoogle = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const code = searchParams.get('code')

  useEffect(() => {
    if (code) {
      getToken('google', code)
        .then(user => {
          console.log('user client', user)
          if (user.id) {
            navigate('/')
          } else {
            alert('로그인에 실패하였습니다.')
            navigate('/login')
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
