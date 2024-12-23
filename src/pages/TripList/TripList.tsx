import InputField from '@/components/designSystem/input/InputField'
import AlarmIcon from '@/components/icons/AlarmIcon'
import RelationSearchIcon from '@/components/icons/RelationSearchIcon'
import Spacing from '@/components/Spacing'
import PopularPlaceList from '@/components/triplist/PopularPlaceList'

import { authStore } from '@/store/client/authStore'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../Home/Navbar'
import TripInfiniteList from '@/components/triplist/TripInfiniteList'
import SortHeader from '@/components/SortHeader'
import { useTripList } from '@/hooks/useTripList'
import CreateTripButton from '../Home/CreateTripButton'
import { useBackPathStore } from '@/store/client/backPathStore'

const LIST = ['최신순', '추천순']

const TripList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [fixed, setFixed] = useState(true)
  const { setSearchTravel, setNotification } = useBackPathStore()

  const sort = (() => {
    const value = searchParams.get('sort')
    if (!value || (value !== 'recent' && value !== 'recommend')) {
      return '최신순'
    }
    return value === 'recent' ? '최신순' : '추천순'
  })()
  const engSort = (() => {
    const value = searchParams.get('sort')
    if (!value || (value !== 'recent' && value !== 'recommend')) {
      return 'recent'
    }
    return value
  })()

  const navigate = useNavigate()
  const { data } = useTripList(engSort)
  const onClickSort = (value: string) => {
    if (value === '추천순') {
      setSearchParams({ sort: 'recommend' })
    } else {
      setSearchParams({ sort: 'recent' })
    }
  }

  const handleNotification = () => {
    setNotification('/community')
    navigate(`/notification`)
  }

  const onClickSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setSearchTravel('/trip/list')
    navigate('/search/travel')
  }

  const handleFixed = (type: boolean) => {
    setFixed(type)
  }
  return (
    <>
      <div>
        <SearchContainer>
          <div css={{ flex: 1 }}>
            <button
              css={{ width: '100%' }}
              onClick={onClickSearch}>
              <InputField
                isRemove={false}
                placeholder="어디로 여행을 떠날까요?"
                icon={<RelationSearchIcon />}
                handleRemoveValue={() => {}}
                disabled
                style={{ pointerEvents: 'none' }}
              />
            </button>
          </div>

          <div
            style={{ cursor: 'pointer' }}
            onClick={handleNotification}>
            <AlarmIcon />
          </div>
        </SearchContainer>
        <Spacing size={8} />
        <PopularPlaceList />
        <Spacing size={31} />
        <SortContainer>
          <SortHeader
            list={LIST}
            clickSort={onClickSort}
            setFixed={handleFixed}
            sort={sort}>
            <CountContainer>
              총&nbsp;<Count>{data?.pages[0].page.totalElements ?? 0}건</Count>
            </CountContainer>
          </SortHeader>
        </SortContainer>
        <TripInfiniteList />
      </div>
      {fixed && <CreateTripButton />}
      <Navbar />
    </>
  )
}

const SearchContainer = styled.div`
  display: flex;
  padding: 0 24px;
  padding-top: 52px;
  padding-bottom: 16px;
  align-items: center;
  gap: 22px;
  position: sticky;
  top: 0px;
  height: 116px;
  background-color: ${palette.BG};
  z-index: 1000;
  justify-content: space-between;
`
const CountContainer = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 16.71px;
  letter-spacing: -0.025em;
`

const Count = styled.span`
  color: #3e8d00;
  font-weight: 700;
`

const SortContainer = styled.div`
  padding: 0 24px;
  padding-bottom: 11px;
  border-bottom: 1px solid rgb(240, 240, 240);
  position: sticky;
  top: 100px;
  z-index: 1001;
  background-color: ${palette.BG};
`

const Bar = styled.div`
  background-color: ${palette.비강조5};
  width: 100%;
  height: 6px;
  margin: 3.8svh 0;
`

export default TripList
