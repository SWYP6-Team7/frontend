import CreateTripInputField from '@/components/designSystem/input/CreateTripInputField'
import AlarmIcon from '@/components/icons/AlarmIcon'
import RelationSearchIcon from '@/components/icons/RelationSearchIcon'
import Spacing from '@/components/Spacing'
import PopularPlaceList from '@/components/triplist/PopularPlaceList'
import useAuth from '@/hooks/user/useAuth'
import useUser from '@/hooks/user/useUser'
import { authStore } from '@/store/client/authStore'
import { userStore } from '@/store/client/userStore'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Home/Navbar'

const TripList = () => {
  const { userId } = authStore()
  return (
    <>
      <div>
        <SearchContainer>
          <div css={{ flex: 1 }}>
            <Link to={'/search/travel'}>
              <CreateTripInputField
                isRemove={false}
                placeholder="어디로 여행을 떠날까요?"
                icon={<RelationSearchIcon />}
                handleRemoveValue={() => {}}
                disabled
              />
            </Link>
          </div>

          <Link to={`notification/${userId}`}>
            <AlarmIcon />
          </Link>
        </SearchContainer>
        <Spacing size={24} />
        <PopularPlaceList />
        <Bar />
      </div>
      <Navbar />
    </>
  )
}

const SearchContainer = styled.div`
  display: flex;
  padding: 0 24px;
  margin-top: 6.1svh;
  align-items: center;
  gap: 22px;
`

const Bar = styled.div`
  background-color: ${palette.비강조5};
  width: 100%;
  height: 6px;
  margin: 3.8svh 0;
`

export default TripList
