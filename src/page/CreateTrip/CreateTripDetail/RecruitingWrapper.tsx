"use client";
import BottomModal from "@/components/BottomModal";
import PersonIcon from "@/components/icons/PersonIcon";
import Vector from "@/components/icons/Vector";
import Spacing from "@/components/Spacing";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import {
  ChangeEvent,
  FocusEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import RecruitingPickerView from "./RecruitingPickerView";
import Button from "@/components/designSystem/Buttons/Button";
import { tripDetailStore } from "@/store/client/tripDetailStore";
import { usePathname } from "next/navigation";
import { createTripStore } from "@/store/client/createTripStore";
import ButtonContainer from "@/components/ButtonContainer";

export default function RecruitingWrapper() {
  const pathname = usePathname();

  const { maxPerson: maxPersonForCreateTrip, addMaxPerson } = createTripStore();
  const [showModal, setShowModal] = useState(false);
  const [focused, setFocused] = useState(false);

  const bgColor = focused ? palette.keycolorBG : palette.검색창;

  const borderColor = focused ? palette.keycolor : bgColor;
  const color = focused ? palette.keycolor : "#000";
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
      addMaxPerson(maxPersonForCreateTrip + 1);
    } else {
      addMaxPerson(
        maxPersonForCreateTrip === 0 ? 0 : maxPersonForCreateTrip - 1
      );
    }
  };

  const handleCloseModal = () => {
    if (maxPersonForCreateTrip <= 0) return;
    setShowModal(false);
  };

  return (
    <>
      <RecruitingContainer>
        <DetailTitle>모집 인원</DetailTitle>
        <RecruitingBtn onClick={(e) => setShowModal(true)}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <PersonIcon stroke={palette.keycolor} width={24} height={20} />
            </div>
            <Count>{maxPersonForCreateTrip}</Count>

            <Vector />
          </div>
        </RecruitingBtn>
      </RecruitingContainer>
      {showModal && (
        <BottomModal
          initialHeight={27} // height 비율이 짧아 진다면 58%로 맞추기.
          closeModal={handleCloseModal}
        >
          <ModalWrapper>
            <ModalContainer>
              <CountContainer>
                <MinusButton onClick={() => onClickButton("minus")} />
                <CountInput
                  value={maxPersonForCreateTrip}
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
              disabled={maxPersonForCreateTrip <= 0}
              addStyle={
                maxPersonForCreateTrip <= 0
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
}
const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden;
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

const DetailTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  text-align: left;
  color: ${palette.비강조};

  padding: 0px 6px;
  gap: 8px;
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

const RecruitingContainer = styled.div``;
const RecruitingBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;

  height: 48px;
  padding: 12px 16px;
  gap: 0px;
  border-radius: 30px;
  border: 1px solid ${palette.비강조3};
  opacity: 0px;
`;
const ButtonWrapper = styled.div<{ width: string; showModal: boolean }>`
  width: 390px;
  @media (max-width: 389px) {
    width: ${(props) => props.width};
  }
  @media (max-width: 450px) {
    width: ${(props) => props.width};
  }

  position: fixed;
  bottom: 4.7svh;
  padding: 0px 24px;
  z-index: 10;
`;
