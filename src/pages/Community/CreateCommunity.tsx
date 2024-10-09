import Button from '@/components/Button'
import ButtonContainer from '@/components/ButtonContainer'
import AddImage from '@/components/community/AddImage'
import CreateTripInputField from '@/components/designSystem/input/CreateTripInputField'
import TextareaField from '@/components/designSystem/input/TextareaField'
import Select from '@/components/designSystem/Select'
import Spacing from '@/components/Spacing'
import styled from '@emotion/styled'
import React, { useState } from 'react'

const LIST = ['잡담', '여행팁', '후기']

const CreateCommunity = () => {
  const [value, setValue] = useState<string>()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const changeValue = (element: string) => {
    setValue(element)
  }

  return (
    <Container>
      <Spacing size={8} />
      <Select
        noneValue="말머리"
        list={LIST}
        value={value}
        setValue={changeValue}
      />
      <Spacing size={'3.8svh'} />
      <CreateTripInputField
        value={title}
        placeholder="제목을 입력해주세요. (최대 20자)"
        isRemove={false}
        onChange={e => setTitle(e.target.value)}
      />
      <Spacing size={'3.8svh'} />
      <TextareaField
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="내용을 입력해주세요. (최대 2,000자)"
      />
      <Spacing size={'3.8svh'} />
      <AddImage />
      <ButtonContainer>
        <Button
          onClick={() => {}}
          disabled={title === '' || content === '' || !value}
          addStyle={
            title === '' || content === '' || !value || !value
              ? {
                  backgroundColor: 'rgba(220, 220, 220, 1)',
                  color: 'rgba(132, 132, 132, 1)',
                  boxShadow: '-2px 4px 5px 0px rgba(170, 170, 170, 0.1)'
                }
              : undefined
          }
          text={'완료'}
        />
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 24px;
`

export default CreateCommunity
