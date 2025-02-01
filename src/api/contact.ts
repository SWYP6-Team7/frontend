import { IContactCreate } from "@/model/contact";
import { axiosInstance } from ".";
import RequestError from "@/context/ReqeustError";

export function postContact(data: IContactCreate) {
  try {
    return axiosInstance.post("/api/inquiry/submit", data);
  } catch (err: any) {
    throw new RequestError(err);
  }
}
