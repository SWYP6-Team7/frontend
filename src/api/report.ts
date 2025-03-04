import RequestError from "@/context/ReqeustError";
import { axiosInstance, handleApiResponse } from ".";
import { getJWTHeader } from "@/utils/user";

type PostReport = {
  reportedUserNumber: number;
  reportReasonId: number;
  reportReasonExtra?: string;
};

export const postReport = async (data: PostReport, accessToken: string) => {
  try {
    const response = await axiosInstance.post("/api/member/block", data, {
      headers: getJWTHeader(accessToken),
    });
    return handleApiResponse(response);
  } catch (err: any) {
    console.log(err, "초기 이미지 등록 오류");

    throw new RequestError(err);
  }
};
