import React, { useState } from "react";
import Accordion from "../Accordion";
import { countItems, getContinentToKorean } from "@/utils/travellog/travelLog";
import styled from "@emotion/styled";
import { palette } from "@/styles/palette";
import dayjs from "dayjs";
import BottomModal from "../BottomModal";
import ButtonContainer from "../ButtonContainer";
import Button from "../designSystem/Buttons/Button";

interface AriaDropdownProps {
  data: {
    [key: string]: {
      locationName?: string;
      countryName?: string;
      visitDates: string[];
    }[];
  };
  setTarget: React.Dispatch<React.SetStateAction<string[] | null>>;
}

const AriaDropdown = ({ data, setTarget }: AriaDropdownProps) => {
  const [showModal, setShowModal] = useState(false);
  const [targetData, setTargetData] = useState<{
    locationName?: string;
    countryName?: string;
    visitDates: string[];
  } | null>(null);

  const openModal = (data) => {
    setShowModal(true);
    setTargetData(data);
  };
  const closeModal = () => {
    setShowModal(false);
    setTargetData(null);
  };
  return (
    <>
      {showModal && (
        <BottomModal initialHeight={40} closeModal={closeModal}>
          <ModalContainer>
            <ModalTitle>{targetData?.locationName ?? targetData?.countryName}</ModalTitle>
            <VisitContainer>
              {targetData?.visitDates.map((date) => (
                <VisitItem>
                  <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.3">
                      <path
                        d="M12 23C15.866 23 19 19.866 19 16C19 12.134 15.866 9 12 9C8.13401 9 5 12.134 5 16C5 19.866 8.13401 23 12 23Z"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 11.8003V16.0003L14.8 17.4003"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                  <div>{dayjs(date).format("YY.MM.DD")} </div>
                </VisitItem>
              ))}
            </VisitContainer>
          </ModalContainer>
          <ButtonContainer>
            <Button onClick={closeModal} text={"닫기"} />
          </ButtonContainer>
        </BottomModal>
      )}
      <Container>
        {Object.keys(data).map((item, index) => (
          <Accordion
            travelCount={countItems(item) ?? 1}
            title={getContinentToKorean(item)}
            count={data[item].length}
            id={item}
            key={item}
            handleOpen={() => setTarget((prev) => (prev ? [...prev, item] : [item]))}
            handleClose={() =>
              setTarget((prev) => (prev && prev?.length > 1 ? prev.filter((prevItem) => prevItem !== item) : null))
            }
            paddingTop="0"
            paddingBottom="13px"
            tabPadding="10px"
            paddingLeft="0"
            paddingRight="0"
            initialChecked={index === 0}
          >
            {data[item].map((region, index) => (
              <ItemContainer onClick={() => openModal(region)}>
                <Index>{index + 1}</Index>
                <Title>{region.locationName ?? region.countryName}</Title>
                <Date>
                  {dayjs(region.visitDates[0]).format("YY.MM.DD")}{" "}
                  {region.visitDates.length > 1 && <More>+{region.visitDates.length}</More>}
                </Date>
              </ItemContainer>
            ))}
          </Accordion>
        ))}
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 0 24px;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 18px 0;
  gap: 8px;
`;

const Index = styled.div`
  width: 18px;
  height: 18px;
  color: white;
  background-color: ${palette.기본};
  border-radius: 50%;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
  line-height: 18px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  flex: 1%;
`;

const Date = styled.div`
  line-height: 16px;
  font-size: 14px;
  color: ${palette.비강조};
`;

const ModalContainer = styled.div`
  padding: 0 24px;
`;

const ModalTitle = styled.div`
  font-size: 18px;
  line-height: 34px;
  padding: 12px 0;
  padding-left: 4px;
  border-bottom: 1px solid #e7e7e7;
`;

const More = styled.span`
  padding: 1px 4px;
  border-radius: 20px;
  background-color: ${palette.비강조2};
  color: white;
  font-size: 12px;
  line-height: 14px;
  font-weight: 600;
  height: 16px;
  margin-left: 4px;
`;

const VisitContainer = styled.div`
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const VisitItem = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  align-items: center;
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
`;
export default AriaDropdown;
