"use client";
import BottomModal from "@/components/BottomModal";
import ButtonContainer from "@/components/ButtonContainer";
import Button from "@/components/designSystem/Buttons/Button";
import ArrowIcon from "@/components/icons/ArrowIcon";
import EveryBodyIcon from "@/components/icons/EveryBodyIcon";
import OnlyFemaleIcon from "@/components/icons/OnlyFemaleIcon";
import OnlyMaleIcon from "@/components/icons/OnlyMaleIcon";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { ChangeEvent, FocusEventHandler, useState } from "react";
import { selections } from "../CreateTripInfo";
import Spacing from "@/components/Spacing";

interface InfoWrapperProps {
  genderType?: string | null;
  maxPerson: number;
  addMaxPerson: (person: number) => void;
  addGenderType: (type: string) => void;
  nowPerson?: number;
}

const InfoWrapper = ({
  genderType,
  maxPerson,
  addMaxPerson,
  addGenderType,
  nowPerson = 0,
}: InfoWrapperProps) => {
  const [showModal, setShowModal] = useState(false);

  const [focused, setFocused] = useState(false);

  const bgColor = focused ? palette.keycolorBG : palette.검색창;

  const borderColor = focused ? palette.keycolor : bgColor;
  const color = focused ? palette.keycolor : "#000";

  const clickGender = (genderType: string) => {
    addGenderType(genderType);
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    setFocused(true);
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    setFocused(false);
  };

  const onChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "0") return;
    const value = Number(e.target.value);
    if (isNaN(value)) return;
    console.log(value);
    e.target.value = value.toString();
    addMaxPerson(value);
  };

  const onClickButton = (type: "plus" | "minus") => {
    if (type === "plus") {
      addMaxPerson(maxPerson + 1);
    } else {
      addMaxPerson(maxPerson === 0 ? 0 : maxPerson - 1);
    }
  };

  const handleCloseModal = () => {
    if (maxPerson <= 0) return;
    setShowModal(false);
  };

  return (
    <>
      <Container onClick={() => setShowModal(true)}>
        <TextContainer>
          <TitleContainer>
            {genderType === "모두" ? (
              <EveryBodyIcon selected size={24} />
            ) : genderType === "남자만" ? (
              <OnlyMaleIcon selected size={24} />
            ) : (
              <OnlyFemaleIcon selected size={24} />
            )}
            <Title>{genderType}</Title>
          </TitleContainer>
          <Content>
            {nowPerson} / {maxPerson}
          </Content>
        </TextContainer>
        <ArrowIconContainer>
          <ArrowIcon />
        </ArrowIconContainer>
      </Container>
      {showModal && (
        <BottomModal
          initialHeight={44} // height 비율이 짧아 진다면 58%로 맞추기.
          closeModal={handleCloseModal}
        >
          <ModalWrapper>
            <ModalContainer>
              <Spacing size={24} />
              <GenderList>
                {selections.map((item) => (
                  <GenderItem
                    isSelected={genderType === item.gender}
                    onClick={() => clickGender(item.gender)}
                  >
                    {item.icon(genderType === item.gender)}
                    <GenderText>{item.gender}</GenderText>
                  </GenderItem>
                ))}
              </GenderList>
              <Spacing size={34} />
              <CountContainer>
                <MinusButton onClick={() => onClickButton("minus")} />
                <CountInput
                  value={maxPerson}
                  onChange={onChangeCount}
                  color={color}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  borderColor={borderColor}
                  bgColor={bgColor}
                  type="number"
                />
                <PlusButton onClick={() => onClickButton("plus")} />
              </CountContainer>
            </ModalContainer>
          </ModalWrapper>
          <ButtonContainer>
            <Button
              onClick={handleCloseModal}
              disabled={maxPerson <= 0}
              addStyle={
                maxPerson <= 0
                  ? {
                      backgroundColor: "rgba(220, 220, 220, 1)",
                      color: "rgba(132, 132, 132, 1)",
                      boxShadow: "-2px 4px 5px 0px rgba(170, 170, 170, 0.1)",
                    }
                  : undefined
              }
              text={"다음"}
            />
          </ButtonContainer>
        </BottomModal>
      )}
    </>
  );
};

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const GenderText = styled.div`
  font-size: 14px;
  line-height: 20px;
`;

const GenderList = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;

const GenderItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: 4px;
  justify-content: center;
  background-color: ${(props) =>
    props.isSelected ? palette.keycolorBG : palette.검색창};
  border: ${(props) =>
    props.isSelected ? `1px solid ${palette.keycolor}` : "0px"};
  border-radius: 20px;
  width: 90px;
  height: 84px;
  color: ${(props) => (props.isSelected ? palette.keycolor : palette.기본)};
  font-weight: ${(props) => (props.isSelected ? 600 : 400)};
`;
const CountContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
`;

const PlusButton = styled.button`
  width: 42px;
  height: 42px;
  cursor: pointer;
  border-radius: 50%;
  position: relative;
  background-color: ${palette.비강조};
  &::after {
    content: "";
    width: 3px;
    height: 16px;
    background-color: #fff;
    border-radius: 8px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &::before {
    content: "";
    width: 16px;
    height: 3px;
    background-color: #fff;
    border-radius: 8px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const MinusButton = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  position: relative;
  background-color: ${palette.비강조};
  cursor: pointer;
  &::before {
    content: "";
    width: 16px;
    height: 3px;
    background-color: #fff;
    border-radius: 8px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  gap: 8px;
  margin-right: 12px;
`;

const CountInput = styled.input<{
  bgColor: string;
  borderColor: string;
  color: string;
}>`
  border-radius: 40px;
  height: 48px;
  text-align: center;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  font-size: 16px;
  line-height: 22px;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox  */
  &[type="number"] {
    -moz-appearance: textfield;
  }
  outline: none;
  border: 1px solid ${(props) => props.borderColor};
`;

const ModalContainer = styled.div`
  flex-grow: 1;

  padding-bottom: 104px;
`;

const Count = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
  margin-left: 4px;
  color: ${palette.비강조2};
  margin-right: 8px;
`;

const Container = styled.div`
  padding: 11px 0;
  cursor: pointer;
  padding-left: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ArrowIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
`;

const Title = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${palette.비강조};
  font-weight: 600;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${palette.기본};
  font-weight: 500;
`;

export default InfoWrapper;
