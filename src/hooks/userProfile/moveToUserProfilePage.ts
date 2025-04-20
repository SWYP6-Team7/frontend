import { userProfileOverlayStore } from "@/store/client/userProfileOverlayStore";

const { setProfileShow, setUserProfileUserId } = userProfileOverlayStore();
export const moveToUserProfilePage = (userNumber: number) => {
  setUserProfileUserId(userNumber);
  setProfileShow(true);
};
