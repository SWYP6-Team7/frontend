import { IContactCreate } from "@/model/contact";
import { axiosInstance, handleApiResponse } from ".";
import RequestError from "@/context/ReqeustError";
import { getJWTHeader } from "@/utils/user";

export async function postContact(data: IContactCreate, accessToken: string | null) {
  try {
    const response = await axiosInstance.post("/api/inquiry/submit", data, {
      timeout: 8000,
      ...(accessToken && { headers: getJWTHeader(accessToken) }),
    });
    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
}
