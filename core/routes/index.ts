import express from "express";
import { Configs } from "../configs";
import serverResponse from "../utils/serverResponse";
const router = express.Router();

router.get("/", (req, res) => {
  serverResponse.handleResponse(
    req,
    res,
    {},
    "success",
    `${Configs.project.name} Server is running on port ${Configs.project.port} 🚀🚀🚀
    `
  );
});

export = router;