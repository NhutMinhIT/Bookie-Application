import { Response } from "express";

export class ResponseUtl {
  static sendResponse<T>(
    res: Response,
    message: string,
    data: T,
    paginationInfo: any = null,
    statusCode = 200
  ): Response<T> {
    return res.status(statusCode).json({
      success: true,
      message: "Fetch author successfully",
      data,
      paginationInfo,
    });
  }

  static sendError<T>(res: Response, message: string, statusCode = 500, error: T): Response<T> {
    return res.status(statusCode).json({
      success: false,
      message,
      error,
    });
  }
}
