import {ResponseFormat} from "./types"
function responseFormats(format: string): [number, string, boolean] {
    let formats: ResponseFormat = {
      success: [200, "OK", true],
      created: [201, "Created", true],
      noContent: [204, "No Content", true],
      badRequest: [400, "Bad Request", false],
      unauthorized: [401, "Unauthorized", false],
      forbidden: [403, "Forbidden", false],
      notFound: [404, "Not Found", false],
      methodNotAllowed: [405, "Method Not Allowed", false],
      internalServerError: [500, "Internal Server Error", false],
      badGateway: [502, "Bad Gateway", false],
      serviceUnavailable: [503, "Service Unavailable", false],
    };
  
    return formats[format] || formats["forbidden"];
  }
  

  export const response = responseFormats