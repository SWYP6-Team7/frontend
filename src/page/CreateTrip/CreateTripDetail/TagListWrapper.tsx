"use client";
import BottomModal from "@/components/BottomModal";
import ButtonContainer from "@/components/ButtonContainer";
import Button from "@/components/designSystem/Buttons/Button";
import BoxLayoutTag from "@/components/designSystem/tag/BoxLayoutTag";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { useState } from "react";
import TagList from "../component/TagList";
import { createTripStore } from "@/store/client/createTripStore";
import Spacing from "@/components/Spacing";
import { TAG_LIST } from "@/constants/tags";

interface TagListWrapperProps {
  taggedArray: string[];
  type: "create" | "edit" | "detail";
}

const TagListWrapper = ({ taggedArray, type }: TagListWrapperProps) => {
  const [showModal, setShowModal] = useState(false);
  const { tags, addTags } = createTripStore();
  const [tempTaggedArray, setTampTaggedArray] = useState(taggedArray);
  const clickTag = (index: number) => {
    const newArray = taggedArray.includes(TAG_LIST.value[index])
      ? taggedArray.filter((v) => v !== TAG_LIST.value[index])
      : [...taggedArray, TAG_LIST.value[index]];
    addTags(newArray);
    setTampTaggedArray(newArray);
  };
  const handleCloseModal = () => {
    if (tempTaggedArray.length > 5) return;
    addTags(tempTaggedArray);
    setTampTaggedArray([]);
    setShowModal(false);
  };
  const handleBackdrop = () => {
    setShowModal(false);
  };
  return (
    <>
      <Container>
        {taggedArray.map((tag) => (
          <BoxLayoutTag
            text={tag}
            addStyle={{
              backgroundColor: palette.비강조4,
              borderRadius: "20px",
              padding: "4px 10px",
              fontSize: "12px",
              fontWeight: "500",
              height: "22px",
              margin: "0",
              color: palette.비강조,
            }}
          />
        ))}
        <EditContainer onClick={() => setShowModal(true)}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.18693 0.719026C8.40571 0.500309 8.7024 0.377441 9.01176 0.377441C9.32112 0.377441 9.61781 0.500309 9.83659 0.719026L11.2803 2.16278C11.3887 2.27112 11.4747 2.39975 11.5334 2.54133C11.592 2.6829 11.6222 2.83465 11.6222 2.9879C11.6222 3.14115 11.592 3.2929 11.5334 3.43447C11.4747 3.57605 11.3887 3.70468 11.2803 3.81303L4.34276 10.7506L0.621094 11.3783L1.24934 7.65661L8.18693 0.719026ZM8.05334 2.50228L9.49709 3.94603L10.4555 2.98761L9.01176 1.54444L8.05334 2.50228ZM8.67168 4.77144L7.22851 3.32769L2.33784 8.21836L2.04443 9.95494L3.78101 9.66211L8.67168 4.77144Z"
              fill="white"
            />
          </svg>
        </EditContainer>
      </Container>
      {showModal && (
        <BottomModal
          initialHeight={65} // height 비율이 짧아 진다면 58%로 맞추기.
          backdropClick={handleBackdrop}
          closeModal={handleCloseModal}
        >
          <ModalWrapper>
            <ModalContainer>
              <Title>
                태그 수정 <Small>(최대 5개)</Small>
              </Title>
              <Spacing size={16} />
              <TagList taggedArray={tempTaggedArray} clickTag={clickTag} />
            </ModalContainer>
          </ModalWrapper>
          <ButtonContainer>
            <Button
              onClick={handleCloseModal}
              disabled={tempTaggedArray.length > 5}
              addStyle={
                tempTaggedArray.length > 5
                  ? {
                      backgroundColor: "rgba(220, 220, 220, 1)",
                      color: "rgba(132, 132, 132, 1)",
                      boxShadow: "-2px 4px 5px 0px rgba(170, 170, 170, 0.1)",
                    }
                  : undefined
              }
              text={"완료"}
            />
          </ButtonContainer>
        </BottomModal>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  margin-left: 6px;
  text-align: left;
`;

const Small = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${palette.비강조};
`;

const EditContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 22px;
  background-color: ${palette.비강조};
  border-radius: 20px;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const ModalContainer = styled.div`
  flex-grow: 1;
  padding: 0 24px;
  padding-bottom: 104px;
`;

export default TagListWrapper;
