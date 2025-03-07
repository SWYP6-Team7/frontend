"use client";
import Button from "@/components/designSystem/Buttons/Button";
import ButtonContainer from "@/components/ButtonContainer";
import InputField from "@/components/designSystem/input/InputField";
import FirstStepIcon from "@/components/icons/FirstStepIcon";
import PlaceIcon from "@/components/icons/PlaceIcon";
import RelationKeywordList from "@/components/relationKeyword/RelationKeywordList";
import Spacing from "@/components/Spacing";
import useRelationKeyword from "@/hooks/search/useRelationKeyword";
import { createTripStore } from "@/store/client/createTripStore";
import styled from "@emotion/styled";
import React, { useEffect, useMemo, useState } from "react";

import useViewTransition from "@/hooks/useViewTransition";
import TripRegion from "@/components/TripRegion";

export default function CreateTripRegion() {
  const navigateWithTransition = useViewTransition();
  // const isMatchedKeyword = useMemo(() => {
  //   if (data?.suggestions && Array.isArray(data.suggestions)) {
  //     return data.suggestions.includes(keyword)
  //   } else {
  //     return false
  //   }
  // }, [keyword, data?.suggestions])

  const handleNext = () => {
    document.documentElement.style.viewTransitionName = "instant";
    navigateWithTransition("/create/trip/date");
  };
  return (
    <Container>
      <StepIconContainer>
        <FirstStepIcon />
      </StepIconContainer>
      <TripRegion nextFunc={handleNext} />
    </Container>
  );
}

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
