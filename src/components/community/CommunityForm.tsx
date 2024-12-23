import { useEffect, useState } from 'react'
import ButtonContainer from '../ButtonContainer'
import Button from '../designSystem/Buttons/Button'
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
import { editStore } from '@/store/client/editStore'
import useViewTransition from '@/hooks/useViewTransition'

const LIST = ['잡담', '여행팁', '후기']

// create request body 타입 추가한 onclick props 추가 필요
// edit 일 경우 data props 추가 필요

interface CommunityFormProps {
  isEdit?: boolean
}

const CommunityForm = ({ isEdit = false }: CommunityFormProps) => {
  const { communityNumber } = useParams()
  const navigateWithTransition = useViewTransition()
  const { editToastShow, setEditToastShow } = editStore()

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
      const activeImages = currentImages.filter(img => img.status !== 'd')
      const deletedImages = [
        ...currentImages.filter(img => img.status === 'd'),
        ...initialImages.filter(
          initialImg =>
            !currentImages.some(
              current => current.imageNumber === initialImg.imageNumber
            )
        )
      ]

      const activeResult = activeImages.reduce(
        (acc: EditFinalImages, currentImage) => {
          const initialIndex = initialImages.findIndex(
            img => img.imageNumber === currentImage.imageNumber
          )

          if (initialIndex === -1) {
            acc.statuses.push('i')
            acc.urls.push(currentImage.url)
            return acc
          }

          const currentOrderIndex = activeImages.findIndex(
            img => img.imageNumber === currentImage.imageNumber
          )
          const initialOrderIndex = initialImages.findIndex(
            img => img.imageNumber === currentImage.imageNumber
          )

          acc.statuses.push(currentOrderIndex !== initialOrderIndex ? 'y' : 'n')
          acc.urls.push(currentImage.url)

          return acc
        },
        { statuses: [], urls: [] }
      )

      const finalResult = {
        statuses: [
          ...activeResult.statuses,
          ...deletedImages.map(() => 'd')
        ] as ('n' | 'y' | 'd' | 'i')[],
        urls: [...activeResult.urls, ...deletedImages.map(img => img.url)]
      }

      saveEditImages(finalResult)
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
        updateImageMutation.mutateAsync({
          editImages: editFinalImages,
          communityNumber: updateMutation.data?.postNumber
        })
      } else {
        setEditToastShow(true)
        document.documentElement.style.viewTransitionName = 'forward'
        navigateWithTransition(
          `/community/detail/${updateMutation.data?.postNumber}`
        )
      }
    }
  }, [
    updateMutation.isSuccess && updateMutation.data,
    JSON.stringify(editFinalImages)
  ])

  useEffect(() => {
    if (updateImageMutation.isSuccess) {
      editReset()
      setEditToastShow(true)
      document.documentElement.style.viewTransitionName = 'forward'
      navigateWithTransition(
        `/community/detail/${updateMutation.data?.postNumber}`
      )
    }
  }, [updateImageMutation.isSuccess, updateMutation.data?.postNumber])

  useEffect(() => {
    if (postImageMutation.isSuccess) {
      reset()
      document.documentElement.style.viewTransitionName = 'forward'
      navigateWithTransition(
        `/community/detail/${postMutation.data?.postNumber}`
      )
    }
  }, [postImageMutation.isSuccess, postMutation.data?.postNumber])

  useEffect(() => {
    if (postMutation.isSuccess && postMutation.data) {
      if (finalImages.tempUrls.length > 0) {
        postImageMutation.mutateAsync({
          uploadImages: finalImages,
          communityNumber: postMutation.data?.postNumber
        })
      } else {
        document.documentElement.style.viewTransitionName = 'forward'
        navigateWithTransition(
          `/community/detail/${postMutation.data?.postNumber}`
        )
      }
    }
  }, [postMutation.isSuccess && postMutation.data, JSON.stringify(finalImages)])

  const handleRemoveValue = () => setTitle('')

  return (
    <>
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
