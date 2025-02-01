"use client";
import BottomModal from "@/components/BottomModal";
import { palette } from "@/styles/palette";
import React, { useEffect, useState } from "react";
import Button from "@/components/designSystem/Buttons/Button";
import styled from "@emotion/styled";
import RoundedImage from "@/components/designSystem/profile/RoundedImage";
import { tripDetailStore } from "@/store/client/tripDetailStore";
import useTripDetail from "@/hooks/tripDetail/useTripDetail";
import BoxLayoutTag from "@/components/designSystem/tag/BoxLayoutTag";
import { useParams, useRouter } from "next/navigation";

interface CompanionsViewProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Companion {
  userNumber: number;
  userName: string;
  ageGroup: string;
  profileUrl: string;
}

export default function CompanionsView({
  isOpen,
  setIsOpen,
}: CompanionsViewProps) {
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const duedateSubmitHandler = () => {
    setIsOpen(false);
    // zustand에 채용 인원 및 성별 저장 로직 필수.
  };
  const { travelNumber } = useParams<{ travelNumber: string }>();
  const router = useRouter();
  if (isNaN(parseInt(travelNumber))) {
    router.replace("/");
  }
  const { profileUrl, userName, userAgeGroup, nowPerson, maxPerson } =
    tripDetailStore();
  const { companions } = useTripDetail(parseInt(travelNumber));
  const allCompanions = companions.data?.data.companions;
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // 초기값 설정
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // resize 이벤트 핸들러
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 클린업
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // width가 390px 미만인 경우에도 버튼의 위치가 고정될 수 있도록. width값 조정.
  const newRightPosition = windowSize.width.toString() + "px";
  return (
    <>
      {isOpen && (
        <BottomModal
          initialHeight={windowSize.height <= 700 ? 75 : 65} // height 비율이 짧아 진다면 58%로 맞추기.
          closeModal={handleCloseModal}
        >
          <ModalWrapper style={{ marginTop: "6px" }}>
            <ModalContainer style={{ padding: "0px 24px" }}>
              <OwnerBox>
                <Title>주최자</Title>

                <div>
                  <div>
                    <RoundedImage size={64} src={profileUrl} />
                  </div>
                  <OwnerInfo>
                    <OwnerName>{userName}</OwnerName>
                    <BoxLayoutTag
                      text={userAgeGroup}
                      addStyle={{
                        backgroundColor: palette.keycolorBG,
                        color: palette.keycolor,
                        padding: "4px 10px 4px 10px",
                        height: "22px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    />
                  </OwnerInfo>
                </div>
              </OwnerBox>
              <Line></Line>
              <PeopleBox>
                <Title>
                  모집 인원{" "}
                  <p
                    style={{
                      marginLeft: "4px",
                      fontWeight: "500",
                      color: palette.비강조2,
                    }}
                  >
                    ({nowPerson}/{maxPerson})
                  </p>
                </Title>
                <CompanionsBox>
                  {allCompanions?.map((person: Companion) => (
                    <OwnerBox
                      key={person.userName}
                      style={{ marginRight: "16px" }}
                    >
                      <div>
                        <div>
                          <RoundedImage
                            size={64}
                            src={person?.profileUrl ? person?.profileUrl : ""}
                          />
                        </div>
                        <OwnerInfo>
                          <OwnerName>{person.userName}</OwnerName>
                          <BoxLayoutTag
                            text={person.ageGroup}
                            addStyle={{
                              backgroundColor: palette.keycolorBG,
                              color: palette.keycolor,
                              padding: "4px 10px 4px 10px",
                              height: "22px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                          />
                        </OwnerInfo>
                      </div>
                    </OwnerBox>
                  ))}
                </CompanionsBox>
              </PeopleBox>
            </ModalContainer>
          </ModalWrapper>
          <ButtonWrapper showModal={isOpen} width={newRightPosition}>
            <div style={{ width: "100%" }}>
              <Button
                text="닫기"
                onClick={duedateSubmitHandler}
                addStyle={{
                  backgroundColor: "rgba(62, 141, 0, 1)",
                  color: "rgba(240, 240, 240, 1)",
                  boxShadow: "rgba(170, 170, 170, 0.1)",
                }}
              />
            </div>
          </ButtonWrapper>
        </BottomModal>
      )}
    </>
  );
}
const OwnerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;
const OwnerName = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  text-align: left;
  color: ${palette.기본};
  margin-bottom: 4px;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 25.2px;
  text-align: left;
  display: flex;
  align-items: center;
`;
const CompanionsBox = styled.div`
  display: flex;
  margin-top: 16px;
  padding-left: 6px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ModalWrapper = styled.div`
  padding-bottom: calc(4.7svh + 48px);
`;
const ModalContainer = styled.div``;

const ButtonWrapper = styled.div<{ width: string; showModal: boolean }>`
  width: 390px;
  @media (max-width: 389px) {
    width: ${(props) => props.width};
  }
  @media (max-width: 450px) {
    width: ${(props) => props.width};
  }
  /* pointer-events: none; */
  position: fixed;
  /* top: 0; */
  bottom: 4.7svh;
  /* z-index: 1001; */

  /* margin-left: ${(props) => (props.showModal ? "0px" : "-24px")}; */
  padding: 0px 24px;
  z-index: 10;
`;
const OwnerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 64px;
`;
const Line = styled.div`
  width: 100%;
  margin: 24px 0px;
  border: 1px solid ${palette.비강조4};
`;
const PeopleBox = styled.div`
  margin-right: -24px;
`;
