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
  IGender,
  IPeople,
  IPeriod,
  IPlace,
  IStyle,
  searchStore
} from '@/store/client/searchStore'
import { palette } from '@/styles/palette'
import useSearch from '@/hooks/search/useSearch'
import WhiteXIcon from './icons/WhiteXIcon'

const FILTER_LIST = [
  { title: '장소', tags: ['국내', '해외'] as const },
  { title: '성별', tags: ['모두', '여자만', '남자만'] as const },
  { title: '인원', tags: ['2인', '3~4명', '5인이상'] as const },
  {
    title: '기간',
    tags: ['일주일 이하', '1~2주', '3~4주', '한달 이상'] as const
  },
  {
    title: '스타일',
    tags: [
      '힐링',
      '즉흥적',
      '계획적인',
      '액티비티',
      '먹방',
      '예술',
      '핫플',
      '쇼핑',
      '가성비',
      '역사',
      '자연'
    ] as const
  }
] as const

const FilterList = () => {
  const [showModal, setShowModal] = useState(false)
  const [initialChecked, setInitialChecked] = useState({
    장소: false,
    인원: false,
    기간: false,
    스타일: false,
    성별: false
  })
  const {
    setFilter,
    place,
    people,
    period,
    style,
    setReset,
    keyword,
    gender,
    setOneFilterReset
  } = searchStore()
  const { refetch } = useSearch({ keyword: keyword })

  const getCount = (type: '장소' | '인원' | '기간' | '스타일' | '성별') => {
    if (type === '장소') return place.length
    if (type === '인원') return people.length
    if (type === '기간') return period.length
    if (type === '스타일') return style.length
    if (type === '성별') return gender.length
    return 0
  }

  const isActive = (
    type: '장소' | '인원' | '기간' | '스타일' | '성별',
    value: IPeople | IPeriod | IStyle | IPlace | IGender
  ) => {
    if (type === '장소') return place?.includes(value as IPlace)
    if (type === '인원') return people?.includes(value as IPeople)
    if (type === '기간') return period?.includes(value as IPeriod)
    if (type === '스타일') return style?.includes(value as IStyle)
    if (type === '성별') return gender?.includes(value as IGender)
    return false
  }

  const handleShowModal = (
    e: MouseEvent,
    title: '장소' | '인원' | '기간' | '스타일' | '성별'
  ) => {
    e.stopPropagation()
    setShowModal(true)
    setInitialChecked(prev => ({ ...prev, [title]: true }))
  }

  const handleCloseModal = () => {
    setInitialChecked({
      기간: false,
      스타일: false,
      인원: false,
      장소: false,
      성별: false
    })
    setShowModal(false)
  }

  const handleOneFilterReset = (
    e: MouseEvent,
    type: '장소' | '인원' | '기간' | '스타일' | '성별'
  ) => {
    e.stopPropagation()
    setOneFilterReset(type)
  }

  const clickTag = (
    type: '장소' | '인원' | '기간' | '스타일' | '성별',
    value: IPeople | IPeriod | IStyle | IPlace | IGender
  ) => {
    if (type === '장소') {
      setFilter(type, [value] as IPlace[])
    } else if (type === '인원') {
      setFilter(type, [value] as IPeople[])
    } else if (type === '기간') {
      setFilter(type, [value] as IPeriod[])
    } else if (type === '스타일') {
      setFilter(type, [value] as IStyle[])
    } else if (type === '성별') {
      setFilter(type, [value] as IGender[])
    }
  }

  const getAllFilterCount = () => {
    return (
      place.length +
      period.length +
      style.length +
      people.length +
      gender.length
    )
  }

  const getFirstTag = (type: '장소' | '인원' | '기간' | '스타일' | '성별') => {
    if (type === '장소') {
      return place[0]
    } else if (type === '인원') {
      return people[0]
    } else if (type === '기간') {
      return period[0]
    } else if (type === '스타일') {
      return style[0]
    } else if (type === '성별') {
      return gender[0]
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
          <ModalWrapper>
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
                        addStyle={{
                          backgroundColor: isActive(item.title, tag)
                            ? 'rgba(227, 239, 217, 1)'
                            : ' rgba(240, 240, 240, 1)',
                          color: isActive(item.title, tag)
                            ? `${palette.keycolor}`
                            : 'rgba(52, 52, 52, 1)',

                          border: isActive(item.title, tag)
                            ? `1px solid ${palette.keycolor}`
                            : 'none'
                        }}
                        text={tag}
                        onClick={() => clickTag(item.title, tag)}
                      />
                    ))}
                  </TagContainer>
                </Accordion>
              ))}

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
            </ModalContainer>
          </ModalWrapper>
        </BottomModal>
      )}
      <Container>
        {FILTER_LIST.map(filter => (
          <FilterContainer
            active={getCount(filter.title) > 0}
            onClick={e => handleShowModal(e, filter.title)}
            key={filter.title}>
            <div>
              {getCount(filter.title) === 0
                ? filter.title
                : getCount(filter.title) === 1
                  ? getFirstTag(filter.title)
                  : `${filter.title} ${getCount(filter.title)}`}
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

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  overflow: hidden;
`

const ModalContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 20px;
  padding-bottom: 13svh;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  left: 0;
  bottom: 0;
  position: absolute;
  padding: 0 24px;
  background-color: white;

  padding-bottom: 4.2svh;

  width: calc(100%);
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
