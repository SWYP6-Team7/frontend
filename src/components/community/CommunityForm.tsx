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
import {
  EditFinalImages,
  EditImage,
  UploadImage,
  useEditStore,
  useUploadStore
} from '@/store/client/imageStore'

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
  const { saveFinalImages, images, finalImages, reset } = useUploadStore()
  const {
    images: editImages,
    finalImages: editFinalImages,
    saveFinalImages: saveEditImages,
    reset: editReset
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
  }, [isEdit, JSON.stringify(community.data)])
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
      const currentImages = [...editImages]
      const result = currentImages.reduce(
        (acc: EditFinalImages, currentImage, currentIndex) => {
          const initialImage = initialImages.find(
            initial => initial.imageNumber === currentImage.imageNumber
          )

          if (!initialImage) {
            acc.statuses.push('n')
            acc.urls.push(currentImage.url)
            return acc
          }

          const initialIndex = initialImages.findIndex(
            img => img.imageNumber === currentImage.imageNumber
          )

          acc.statuses.push(initialIndex !== currentIndex ? 'y' : 'n')
          acc.urls.push(currentImage.url)

          return acc
        },
        { statuses: [], urls: [] }
      )

      initialImages.forEach(initialImage => {
        const isDeleted = !currentImages.some(
          current =>
            current.imageNumber === initialImage.imageNumber &&
            current.status !== 'd'
        )
        if (isDeleted) {
          result.statuses.push('d')
          result.urls.push(initialImage.url)
        }
      })

      saveEditImages(result)
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
      if (editFinalImages.urls.length > 0) {
        setTripEditToastShow(true)
        updateImageMutation.mutateAsync({
          editImages: editFinalImages,
          communityNumber: updateMutation.data?.postNumber
        })
      }
    }
  }, [
    updateMutation.isSuccess && updateMutation.data,
    JSON.stringify(editFinalImages)
  ])

  useEffect(() => {
    if (updateImageMutation.isSuccess) {
      editReset()
      setTimeout(() => {
        navigate(`/community/detail/${updateMutation.data?.postNumber}`)
      }, 1000)
    }
  }, [updateImageMutation.isSuccess, updateMutation.data?.postNumber])

  useEffect(() => {
    if (postImageMutation.isSuccess) {
      reset()
      navigate(`/community/detail/${postMutation.data?.postNumber}`)
    }
  }, [postImageMutation.isSuccess, postMutation.data?.postNumber])

  useEffect(() => {
    if (postMutation.isSuccess && postMutation.data) {
      if (finalImages.tempUrls.length > 0) {
        postImageMutation.mutateAsync({
          uploadImages: finalImages,
          communityNumber: postMutation.data?.postNumber
        })
      }
    }
  }, [postMutation.isSuccess && postMutation.data, JSON.stringify(finalImages)])
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
