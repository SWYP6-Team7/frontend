"use client";
import { createTrip } from "@/api/trip";
import ButtonContainer from "@/components/ButtonContainer";
import Button from "@/components/designSystem/Buttons/Button";
import SearchFilterTag from "@/components/designSystem/tag/SearchFilterTag";
import FourthStepIcon from "@/components/icons/FourthStepIcon";
import Spacing from "@/components/Spacing";
import { TAG_LIST } from "@/constants/tags";
import useViewTransition from "@/hooks/useViewTransition";
import { createTripStore } from "@/store/client/createTripStore";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { useState } from "react";

const CreateTripTag = () => {
  const { tags, addTags } = createTripStore();
  const [taggedArray, setTaggedArray] = useState<string[]>(tags);
  const navigateWithTransition = useViewTransition();
  const isActive = (tag: string) => {
    return taggedArray.includes(tag);
  };

  const clickTag = (tag: string) => {
    const newArray = taggedArray.includes(tag) ? taggedArray.filter((v) => v !== tag) : [...taggedArray, tag];
    addTags(newArray);
    setTaggedArray(newArray);
  };

  const handleNext = () => {
    document.documentElement.style.viewTransitionName = "instant";
    navigateWithTransition("/create/trip/introduce");
  };
  return (
    <Container>
      <StepIconContainer>
        <FourthStepIcon />
      </StepIconContainer>
      <Title>
        여행 스타일을 알려주세요 <Small>(최대 5개)</Small>
      </Title>
      <Spacing size={20} />
      <TagContainer>
        {TAG_LIST[0].tags?.map((tag, idx) => (
          <SearchFilterTag
            key={tag}
            idx={idx}
            addStyle={{
              backgroundColor: isActive(tag) ? "rgba(227, 239, 217, 1)" : " rgba(240, 240, 240, 1)",
              color: isActive(tag) ? `${palette.keycolor}` : "rgba(52, 52, 52, 1)",

              border: isActive(tag) ? `1px solid ${palette.keycolor}` : `1px solid ${palette.검색창}`,
              borderRadius: "30px",
              padding: "10px 20px",
              fontWeight: isActive(tag) ? "600" : "400",
              lineHeight: "22px",
            }}
            text={tag}
            onClick={() => clickTag(tag)}
          />
        ))}
      </TagContainer>
      <ButtonContainer>
        <Button
          onClick={handleNext}
          disabled={tags.length === 0}
          addStyle={
            tags.length === 0
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
    </Container>
  );
};

const StepIconContainer = styled.div`
  margin-top: 8px;
  margin-bottom: 40px;
`;

const Container = styled.div`
  padding: 0 24px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  margin-left: 6px;
  text-align: left;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const Small = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${palette.비강조};
`;

export default CreateTripTag;
