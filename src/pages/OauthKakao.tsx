import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '@/api/user'

const OauthKakao = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const code = searchParams.get('code') // 카카오에서 받은 인증 코드

  useEffect(() => {
    if (code) {
      // 카카오 인증 코드를 이용해 서버에서 토큰을 요청

      getToken('kakao', code)
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

export default OauthKakao
