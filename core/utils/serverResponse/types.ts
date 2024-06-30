import { Request, Response } from "express";

interface ResponseFormat {
  [key: string]: [number, string, boolean];
}
interface CustomRequest extends Request {}
interface CustomResponse extends Response{}

export {ResponseFormat, CustomRequest, CustomResponse}