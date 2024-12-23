import AlarmIcon from '@/components/icons/AlarmIcon'
import Spacing from '@/components/Spacing'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from './Home/Navbar'
import SortHeader from '@/components/SortHeader'
import CreateTripButton from './Home/CreateTripButton'
import CategoryList from '@/components/community/CategoryList'
import SearchIcon from '@/components/icons/SearchIcon'
import CommunityInfinite from '@/components/community/CommunityInfinite'
import ResultToast from '@/components/designSystem/toastMessage/resultToast'
import { editStore } from '@/store/client/editStore'
import { COMMUNITY_TOAST_MESSAGES } from '@/constants/toastMessages'
import { useBackPathStore } from '@/store/client/backPathStore'
import CustomLink from '@/components/CustomLink'
import useCommunity from '@/hooks/useCommunity'

const LIST = ['최신순', '추천순', '등록일순']
const MyCommunity = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [fixed, setFixed] = useState(true)
  const sort = searchParams.get('sortingTypeName') ?? '최신순'
  const categoryName = searchParams.get('categoryName') ?? '전체'
  const {
    communityList: { data }
  } = useCommunity(
    undefined,
    {
      sortingTypeName: sort,
      categoryName: categoryName
    },
    true
  )
  const { setRemoveToastShow, removeToastShow } = editStore()
  const onClickSort = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set('sortingTypeName', value)

    setSearchParams(newSearchParams)
  }

  const handleFixed = (type: boolean) => {
    setFixed(type)
  }

  return (
    <>
      <ResultToast
        bottom="80px"
        isShow={removeToastShow}
        setIsShow={setRemoveToastShow}
        text={COMMUNITY_TOAST_MESSAGES.deletePost}
      />
      <div>
        <Spacing size={24} />
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
        <CommunityInfinite isMine={true} />
      </div>
      <Navbar />
    </>
  )
}

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
  box-sizing: border-box;
`

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  line-height: 26.25px;
  flex: 1;
`
const IconContainer = styled.div`
  display: flex;
  align-items: center;
`

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
`

export default MyCommunity
