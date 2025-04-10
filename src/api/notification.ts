import { getJWTHeader } from "@/utils/user";
import { axiosInstance, handleApiResponse } from ".";
import RequestError from "@/context/ReqeustError";

export async function getNotifications(pageParams: number, accessToken: string) {
  try {
    const response = await axiosInstance.get(`/api/notifications`, {
      params: {
        page: pageParams,
      },
      headers: getJWTHeader(accessToken),
    });

    return handleApiResponse(response);
  } catch (error: any) {
    throw new RequestError(error);
  }
}
