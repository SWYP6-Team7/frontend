"use client";
import { userProfileOverlayStore } from "@/store/client/userProfileOverlayStore";

export const moveToUserProfilePage = (userNumber: number) => {
  const { setProfileShow, setUserProfileUserId } = userProfileOverlayStore();

  setUserProfileUserId(userNumber);
  setProfileShow(true);
};
