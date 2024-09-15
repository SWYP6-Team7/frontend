import Select from '@/components/designSystem/Select'
import Spacing from '@/components/Spacing'
import useAuth from '@/hooks/user/useAuth'
import useUser from '@/hooks/user/useUser'
import { authStore } from '@/store/client/authStore'
import React, { ChangeEvent, useState } from 'react'

export const LIST = ['안녕', '나는', '박건상', '이야']

const Home = () => {
  const [infoValues, setInfoValues] = useState('장소')
  const { user } = useUser()
  const { userId, accessToken } = authStore()
  const { logout } = useAuth()
  const handleLogout = () => {
    logout()
  }
  console.log(user, userId, accessToken)

  const changeSelect = (element: string) => {
    setInfoValues(element)
  }
  return (
    <div>
      <div>{JSON.stringify(user)}</div>
      <button onClick={handleLogout}>로그아웃</button>
      <Spacing size={40} />
      <Select
        list={LIST}
        setValue={changeSelect}
        value={infoValues}
      />
    </div>
  )
}

export default Home
