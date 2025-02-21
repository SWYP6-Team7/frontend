import CalendarPage from "@/page/CreateTrip/CalendarPageServer";
import CreateTripIntroduce from "@/page/CreateTrip/CreateTripIntroduce";
import React from "react";

interface PageProps {
  searchParams: { year?: string; month?: string };
}

const CreateTripIntroducePage = ({ searchParams }: PageProps) => {
  return <CalendarPage searchParams={searchParams} />;
};

export default CreateTripIntroducePage;
