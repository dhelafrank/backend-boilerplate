import { CustomRequest, CustomResponse } from "./types"
import { response } from "./responseFormat";
import logger from "../logger";

class serverResponse {
  handleResponse(
    req: CustomRequest,
    res: CustomResponse,
    data: Object,
    responseStatus: string,
    message: string
  ) {
    let responseArray = response(responseStatus);
    const responseObject = {
      isSuccess: responseArray[2],
      status: responseArray[1],
      statusCode: responseArray[0],
      data: data || [],
      message: message || responseArray[1],
    };
    res.status(responseArray[0]).json(responseObject);
    logger.info(`${req.id} - ${req.method}: ${req.originalUrl} - ${res.statusCode}`);
  }

  handleError(
    req: CustomRequest,
    res: CustomResponse,
    errorType: string,
    message?: string,
    error?: Error,
  ) {
    const errorArray = response(errorType);
    const responseObject = {
      isSuccess: errorArray[2],
      status: errorArray[1],
      statusCode: errorArray[0],
      data: [],
      message: message || errorArray[1],
      errorMessage: error?.message,
    };
    res.status(errorArray[0]).json(responseObject);
    logger.error(`${req.id} - ${req.method}: ${req.originalUrl} - ${res.statusCode}`);
  }
}

export default new serverResponse();