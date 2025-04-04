import { RequestErrorType } from "@/model/error";

const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

class RequestError extends Error {
  status;
  endpoint;
  errorCode;
  message;

  constructor({
    status,
    endpoint,
    errorCode,
    name,
    message,
  }: RequestErrorType) {
    super(errorCode);
    this.status = status;
    this.endpoint = endpoint;
    this.errorCode = errorCode;
    this.message = message;

    const errorStatus = status || 0;
    this.name = "ApiError";

    switch (errorStatus) {
      case HTTP_STATUS.BAD_REQUEST: // 400
        this.name = "ApiBadRequestError";
        break;
      case HTTP_STATUS.UNAUTHORIZED: // 401
        this.name = "ApiUnauthorizedError";
        break;
      case HTTP_STATUS.FORBIDDEN: // 403
        this.name = "ApiForbiddenError";
        break;
      case HTTP_STATUS.NOT_FOUND: // 404
        this.name = "ApiNotFoundError";
        break;
      case HTTP_STATUS.INTERNAL_SERVER_ERROR: // 500
        this.name = "ApiInternalServerError";
        break;
    }
  }
}

export default RequestError;
