import styled from '@emotion/styled'
import React, { useState, MouseEvent } from 'react'
import SelectArrow from './icons/SelectArrow'
import Accordion from './Accordion'
import BottomModal from './BottomModal'
import SearchFilterTag from './designSystem/tag/SearchFilterTag'
import ResetIcon from './icons/ResetIcon'
import Button from './Button'
import Spacing from './Spacing'

import {
  IPeople,
  IPeriod,
  IPlace,
  IStyle,
  searchStore
} from '@/store/client/searchStore'
import { palette } from '@/styles/palette'
import useSearch from '@/hooks/useSearch'
import WhiteXIcon from './icons/WhiteXIcon'

const FILTER_LIST = [
  { title: '장소', tags: ['국내', '해외'] as const },
  { title: '인원', tags: ['2인', '3인', '4인', '5인이상'] as const },
  { title: '기간', tags: ['일주일 이하', '1~4주', '한달 이상'] as const },
  {
    title: '스타일',
    tags: ['여유', '도시', '액티비티', '전통', '가성비'] as const
  }
] as const

const FilterList = () => {
  const [showModal, setShowModal] = useState(false)
  const [initialChecked, setInitialChecked] = useState({
    장소: false,
    인원: false,
    기간: false,
    스타일: false
  })
  const {
    setFilter,
    place,
    people,
    period,
    style,
    setReset,
    keyword,
    setOneFilterReset
  } = searchStore()
  const { refetch } = useSearch({ keyword: keyword, tags: [] })

  const getCount = (type: '장소' | '인원' | '기간' | '스타일') => {
    if (type === '장소') return place.length
    if (type === '인원') return people.length
    if (type === '기간') return period.length
    if (type === '스타일') return style.length
    return 0
  }

  const isActive = (
    type: '장소' | '인원' | '기간' | '스타일',
    value: IPeople | IPeriod | IStyle | IPlace
  ) => {
    if (type === '장소') return place?.includes(value as IPlace)
    if (type === '인원') return people?.includes(value as IPeople)
    if (type === '기간') return period?.includes(value as IPeriod)
    if (type === '스타일') return style?.includes(value as IStyle)
    return false
  }

  const handleShowModal = (
    e: MouseEvent,
    title: '장소' | '인원' | '기간' | '스타일'
  ) => {
    e.stopPropagation()
    setShowModal(true)
    setInitialChecked(prev => ({ ...prev, [title]: true }))
  }

  const handleCloseModal = () => {
    setInitialChecked({ 기간: false, 스타일: false, 인원: false, 장소: false })
    setShowModal(false)
  }

  const handleOneFilterReset = (
    e: MouseEvent,
    type: '장소' | '인원' | '기간' | '스타일'
  ) => {
    e.stopPropagation()
    setOneFilterReset(type)
  }

  const clickTag = (
    type: '장소' | '인원' | '기간' | '스타일',
    value: IPeople | IPeriod | IStyle | IPlace
  ) => {
    if (type === '장소') {
      setFilter(type, [value] as IPlace[])
    } else if (type === '인원') {
      setFilter(type, [value] as IPeople[])
    } else if (type === '기간') {
      setFilter(type, [value] as IPeriod[])
    } else if (type === '스타일') {
      setFilter(type, [value] as IStyle[])
    }
  }

  const getAllFilterCount = () => {
    return place.length + period.length + style.length + people.length
  }

  const getFirstTag = (type: '장소' | '인원' | '기간' | '스타일') => {
    if (type === '장소') {
      return place[0]
    } else if (type === '인원') {
      return people[0]
    } else if (type === '기간') {
      return period[0]
    } else if (type === '스타일') {
      return style[0]
    }
  }

  const handleReset = () => {
    setReset()
  }

  const handleSearch = () => {
    setShowModal(false)
    refetch()
  }

  return (
    <>
      {showModal && (
        <BottomModal
          initialHeight={75}
          closeModal={handleCloseModal}>
          <ModalContainer>
            {FILTER_LIST.map(item => (
              <Accordion
                count={getCount(item.title)}
                id={item.title}
                title={item.title}
                initialChecked={initialChecked[item.title]}
                key={item.title}>
                <TagContainer>
                  {item.tags?.map((tag, idx) => (
                    <SearchFilterTag
                      key={tag}
                      idx={idx}
                      active={isActive(item.title, tag)}
                      text={tag}
                      onClick={() => clickTag(item.title, tag)}
                    />
                  ))}
                </TagContainer>
              </Accordion>
            ))}
          </ModalContainer>
          <Spacing size={'12svh'} />
          <ButtonContainer>
            <button onClick={handleReset}>
              <ResetIcon />
            </button>

            <Button
              onClick={handleSearch}
              addStyle={
                getAllFilterCount() === 0
                  ? {
                      backgroundColor: 'rgba(220, 220, 220, 1)',
                      color: palette.비강조
                    }
                  : undefined
              }
              disabled={getAllFilterCount() === 0}
              text={
                getAllFilterCount() === 0
                  ? '필터 검색'
                  : `${getAllFilterCount()}개 필터 검색`
              }
            />
          </ButtonContainer>
        </BottomModal>
      )}
      <Container>
        {FILTER_LIST.map(filter => (
          <FilterContainer
            active={getCount(filter.title) > 0}
            onClick={e => handleShowModal(e, filter.title)}
            key={filter.title}>
            <div>
              {getCount(filter.title) > 0
                ? getFirstTag(filter.title)
                : filter.title}
            </div>
            {getCount(filter.title) > 0 ? (
              <button onClick={e => handleOneFilterReset(e, filter.title)}>
                <WhiteXIcon size={9} />
              </button>
            ) : (
              <SelectArrow />
            )}
          </FilterContainer>
        ))}
      </Container>
    </>
  )
}

const ModalContainer = styled.div`
  position: relative;
  min-height: 60svh;
  height: fit-content;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: absolute;
  bottom: 4.2svh;
  width: calc(100% - 40px);
`

const Container = styled.div`
  display: flex;
  position: relative;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  padding-bottom: 3px;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  overflow-x: scroll;
  align-items: center;
  gap: 9px;
`

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`

const FilterContainer = styled.button<{ active: boolean }>`
  transition: 0.2s ease-in-out;

  border-radius: 15px;
  background: #ffffff;
  border: 1px solid #ababab;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background-color: ${props =>
    props.active ? `${palette.keycolor}` : 'white'};
  color: ${props => (props.active ? 'white' : `black`)};
`

export default FilterList
