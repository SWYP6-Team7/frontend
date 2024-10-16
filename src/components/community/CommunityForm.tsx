import { useEffect, useState } from 'react'
import ButtonContainer from '../ButtonContainer'
import Button from '../Button'
import Spacing from '../Spacing'
import AddImage from './AddImage'
import TextareaField from '../designSystem/input/TextareaField'
import CreateTripInputField from '../designSystem/input/CreateTripInputField'
import Select from '../designSystem/Select'
import styled from '@emotion/styled'
import useCommunity from '@/hooks/useCommunity'
import { useNavigate, useParams } from 'react-router-dom'
import ResultToast from '../designSystem/toastMessage/resultToast'
import { Image } from '@/model/community'
import { useEditStore, useUploadStore } from '@/store/client/imageStore'

const LIST = ['잡담', '여행팁', '후기']

// create request body 타입 추가한 onclick props 추가 필요
// edit 일 경우 data props 추가 필요

interface CommunityFormProps {
  isEdit?: boolean
}

const CommunityForm = ({ isEdit = false }: CommunityFormProps) => {
  const { communityNumber } = useParams()
  const navigate = useNavigate()
  const [tripEditToastShow, setTripEditToastShow] = useState(false) // 상세 글 변경시 보이게 해줄 토스트 메시지

  const {
    community,
    post,
    update,
    postMutation,
    updateMutation,
    postImageMutation,
    updateImageMutation
  } = useCommunity(Number(communityNumber))
  const { saveFinalImages, images } = useUploadStore()
  const {
    images: editImages,

    saveFinalImages: saveEditImages
  } = useEditStore()
  const { images: detailImages } = useCommunity(Number(communityNumber))

  const [value, setValue] = useState<string>()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const changeValue = (element: string) => {
    setValue(element)
  }
  useEffect(() => {
    if (community.data && isEdit) {
      setValue(community.data.categoryName)
      setTitle(community.data.title)
      setContent(community.data.content)
    }
  }, [isEdit, community.data])
  const submitCommunity = () => {
    if (!value || title === '' || content === '') {
      return
    }

    if (isEdit) {
      if (!communityNumber) {
        return
      }
      const detailImageList = detailImages.data ?? []
      const initialImages = [...detailImageList] // 초기 이미지 목록
      const currentImages = [...editImages] // 현재 이미지 목록

      const statuses = currentImages.map((img, index) => {
        const initialImage = initialImages.find(
          initial => initial.imageNumber === img.imageNumber
        )
        if (!initialImage) return 'd' // 초기 이미지 목록에 없는 경우 삭제된 이미지

        if (initialImage.url !== img.url) return 'y' // URL이 변경된 경우
        if (
          index !==
          initialImages.findIndex(
            initial => initial.imageNumber === img.imageNumber
          )
        )
          return 'y' // 순서 변경된 경우
        return 'n' // 변경 없음
      })

      const urls = currentImages.map(img => img.url)

      saveEditImages({ statuses, urls })
      update({
        categoryName: value,
        communityNumber: Number(communityNumber),
        title: title,
        content: content
      })
    } else {
      saveFinalImages() // 업로드 시 저장
      post({ categoryName: value, title: title, content: content })
    }
  }

  console.log(editImages, images, 'images')

  useEffect(() => {
    if (updateMutation.isSuccess && updateMutation.data) {
      navigate(`/community/detail/${updateMutation.data?.postNumber}`)
      setTripEditToastShow(true)
      updateImageMutation.mutateAsync({
        editImages: editImages,
        communityNumber: updateMutation.data?.postNumber
      })
      setTimeout(() => {
        navigate(`/community/detail/${updateMutation.data?.postNumber}`)
      }, 1000)
    }
  }, [updateMutation.isSuccess && updateMutation.data])

  useEffect(() => {
    if (postMutation.isSuccess && postMutation.data) {
      postImageMutation.mutateAsync({
        uploadImages: images,
        communityNumber: postMutation.data?.postNumber
      })
      navigate(`/community/detail/${postMutation.data?.postNumber}`)
    }
  }, [postMutation.isSuccess && postMutation.data])
  const handleRemoveValue = () => setTitle('')
  return (
    <>
      <ResultToast
        height={120}
        isShow={tripEditToastShow}
        setIsShow={setTripEditToastShow}
        text="게시글이 수정되었어요."
      />
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
          isRemove={true}
          handleRemoveValue={handleRemoveValue}
          onChange={e => setTitle(e.target.value)}
        />
        <Spacing size={'3.8svh'} />
        <TextareaField
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="내용을 입력해주세요. (최대 2,000자)"
        />
        <Spacing size={'3.8svh'} />
        <AddImage isEdit={isEdit} />
        <ButtonContainer>
          <Button
            onClick={submitCommunity}
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
    </>
  )
}
const Container = styled.div`
  padding: 0 24px;
`

export default CommunityForm
