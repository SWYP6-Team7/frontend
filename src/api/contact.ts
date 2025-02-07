import { IContactCreate } from "@/model/contact";
import { axiosInstance } from ".";
import RequestError from "@/context/ReqeustError";
import { getJWTHeader } from "@/utils/user";

export function postContact(data: IContactCreate, accessToken: string | null) {
  try {
    return axiosInstance.post("/api/inquiry/submit", data, {
      timeout: 8000,
      ...(accessToken && { headers: getJWTHeader(accessToken) }),
    });
  } catch (err: any) {
    throw new RequestError(err);
  }
}
