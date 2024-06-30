import serverResponse from "../../utils/serverResponse";
import { Request, Response } from "express";
import AdminService from "./admins.service";

class Admin {
  public service = new AdminService()
  async createAccount(req: Request, res: Response) {
    try {
      await this.service.createNewAdmin(req.body)
      serverResponse.handleResponse(
        req,
        res,
        {},
        "success",
        "Admin Created Sucessfully"
      );
    } catch (error) {
      console.log(error);
      serverResponse.handleError(
        req,
        res,
        "internalServerError"
      );
    }
  }
}

export default Admin;
