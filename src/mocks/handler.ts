import { http, HttpResponse, StrictResponse } from "msw";

const Posts = [];

export const handlers = [
  http.get("mock/test", () => {
    console.log("testing");
    return HttpResponse.json({ key: "hello" });
  }),
];
