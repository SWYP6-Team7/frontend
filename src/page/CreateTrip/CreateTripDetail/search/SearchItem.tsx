"use client";
import { createTripStore } from "@/store/client/createTripStore";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { MouseEvent } from "react";
import { v4 as uuidv4 } from "uuid";

const SearchItem = ({
  id,
  title,
  type,
  location,
  lng,
  lat,
}: {
  id: string;
  title: string;
  type: string;
  location: string;
  lat: number;
  lng: number;
}) => {
  const router = useRouter();
  const { planOrder } = useParams();
  const {
    locationName: { mapType, locationName },
    addPlans,
    plans,
  } = createTripStore();
  const searchParams = useSearchParams();
  const paramsType = searchParams?.get("type") ?? "create";
  const travelNumber = searchParams?.get("travelNumber") ?? "";

  const handlePlans = (e: MouseEvent) => {
    e.stopPropagation();
    if (!planOrder) return;
    const targetPlanIndex = plans.findIndex((plan) => plan.planOrder === Number(planOrder));
    let newPlans: any[] = [];
    if (targetPlanIndex > -1) {
      newPlans = plans.map((plan) =>
        plan.planOrder === targetPlanIndex
          ? {
              ...plan,
              spots: [
                ...plan.spots,
                {
                  id: uuidv4(),
                  name: title,
                  category: type,
                  region: locationName,
                  latitude: Number(lat),
                  longitude: Number(lng),
                },
              ],
            }
          : { ...plan }
      );
    } else {
      newPlans = [
        ...plans,
        {
          planOrder: Number(planOrder),
          spots: [
            {
              id: uuidv4(),
              name: title,
              category: type,
              region: location,
              latitude: Number(lat),
              longitude: Number(lng),
            },
          ],
        },
      ];
    }
    console.log("new plan", newPlans);
    addPlans(newPlans);
    if (paramsType === "create") {
      router.push("/create/trip/detail");
    } else {
      router.push(`/trip/edit/${travelNumber}`);
    }
  };
  return (
    <Container
      onClick={() =>
        router.push(
          `/search/place/${planOrder}/${mapType === "google" ? id : title}?type=${paramsType}${paramsType === "edit" ? `&travelNumber=${travelNumber}` : ""}`
        )
      }
    >
      <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M25 14.4091C25 21.7273 16 28 16 28C16 28 7 21.7273 7 14.4091C7 11.9136 7.94821 9.52041 9.63604 7.75586C11.3239 5.99131 13.6131 5 16 5C18.3869 5 20.6761 5.99131 22.364 7.75586C24.0518 9.52041 25 11.9136 25 14.4091Z"
          fill="#CDCDCD"
        />
        <path
          d="M15.9961 17.5457C17.6529 17.5457 18.9961 16.1415 18.9961 14.4093C18.9961 12.6771 17.6529 11.2729 15.9961 11.2729C14.3392 11.2729 12.9961 12.6771 12.9961 14.4093C12.9961 16.1415 14.3392 17.5457 15.9961 17.5457Z"
          fill="#FEFEFE"
        />
      </svg>
      <MainContainer>
        <Title>{title}</Title>
        <SubTitle>
          {type}ㆍ{location}
        </SubTitle>
      </MainContainer>
      <AddButton onClick={handlePlans}>추가</AddButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 69px;
  width: 100%;
  gap: 4px;
  border-bottom: 1px solid #e7e7e7;
`;

const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Title = styled.div`
  line-height: 19px;
  font-size: 16px;
  font-weight: 600;
  color: ${palette.기본};
`;

const SubTitle = styled.div`
  line-height: 14px;
  font-size: 12px;
  color: ${palette.비강조};
  font-weight: 400l;
`;

const AddButton = styled.button`
  background-color: ${palette.비강조5};
  color: ${palette.기본};
  line-height: 14px;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 20px;
`;

export default SearchItem;
